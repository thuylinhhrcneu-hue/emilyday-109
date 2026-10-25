import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer,
  setDoc, 
  updateDoc,
  collection, 
  query, 
  where,
  getDocs,
  onSnapshot,
  increment,
  type Unsubscribe
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial connection as required by Skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or network status.");
    }
  }
}
testConnection();

// Newsletter Subscription Service
export async function subscribeNewsletter(email: string, name?: string, interest?: string): Promise<{ success: boolean; id: string }> {
  const cleanEmail = email.trim().toLowerCase();
  // Safe document ID format: sanitize email for id
  const docId = cleanEmail.replace(/[^a-zA-Z0-9_-]/g, '_');
  const path = `subscribers/${docId}`;
  
  try {
    const payload: { email: string; createdAt: string; name?: string; interest?: string } = {
      email: cleanEmail,
      createdAt: new Date().toISOString()
    };
    if (name?.trim()) payload.name = name.trim();
    if (interest?.trim()) payload.interest = interest.trim();

    await setDoc(doc(db, 'subscribers', docId), payload);
    return { success: true, id: docId };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, id: docId };
  }
}

// Partnership & Inquiries Service
export interface CollaborationInquiry {
  name: string;
  email: string;
  organization?: string;
  serviceType: string;
  message: string;
  budgetRange?: string;
}

export async function submitInquiry(data: CollaborationInquiry): Promise<{ success: boolean; id: string }> {
  const docId = 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const path = `inquiries/${docId}`;

  try {
    const payload: Record<string, any> = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      serviceType: data.serviceType,
      message: data.message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    if (data.organization?.trim()) payload.organization = data.organization.trim();
    if (data.budgetRange?.trim()) payload.budgetRange = data.budgetRange.trim();

    await setDoc(doc(db, 'inquiries', docId), payload);
    return { success: true, id: docId };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, id: docId };
  }
}

// Article Likes Counter
export async function getArticleLikes(articleId: string): Promise<number> {
  const path = `article_likes/${articleId}`;
  try {
    const docSnap = await getDoc(doc(db, 'article_likes', articleId));
    if (docSnap.exists()) {
      return docSnap.data().likesCount || 0;
    }
    return 0;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return 0;
  }
}

export async function incrementArticleLike(articleId: string): Promise<number> {
  const path = `article_likes/${articleId}`;
  try {
    const ref = doc(db, 'article_likes', articleId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        articleId,
        likesCount: 1,
        updatedAt: new Date().toISOString()
      });
      return 1;
    } else {
      const current = snap.data().likesCount || 0;
      await updateDoc(ref, {
        likesCount: current + 1,
        updatedAt: new Date().toISOString()
      });
      return current + 1;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    return 0;
  }
}

// Article Comments
export interface ArticleCommentItem {
  id: string;
  articleId: string;
  authorName: string;
  comment: string;
  createdAt: string;
}

export async function addArticleComment(articleId: string, authorName: string, comment: string): Promise<ArticleCommentItem> {
  const docId = 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const path = `article_comments/${docId}`;
  try {
    const payload = {
      articleId,
      authorName: authorName.trim(),
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'article_comments', docId), payload);
    return { id: docId, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export function subscribeComments(articleId: string, callback: (comments: ArticleCommentItem[]) => void): Unsubscribe {
  const path = 'article_comments';
  try {
    const q = query(collection(db, path), where('articleId', '==', articleId));
    return onSnapshot(q, (snapshot) => {
      const list: ArticleCommentItem[] = [];
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          articleId: d.articleId,
          authorName: d.authorName,
          comment: d.comment,
          createdAt: d.createdAt
        });
      });
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callback(list);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return () => {};
  }
}

// Google Auth for Creator/Admin view
export async function loginWithGoogle(): Promise<User | null> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google Sign-in error:', error);
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}
