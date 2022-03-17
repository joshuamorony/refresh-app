import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
  TokenOptions,
} from '@firebase/rules-unit-testing';

import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

const getFirestore = (authUser?: { uid: string; token: TokenOptions }) =>
  authUser
    ? testEnv.authenticatedContext(authUser.uid, authUser.token).firestore()
    : testEnv.unauthenticatedContext().firestore();

const adminAuth = {
  uid: 'user_good',
  token: { email: 'kathryn.morony@gmail.com', email_verified: true },
};
const hackerAuth = {
  uid: 'user_bad',
  token: { email: 'villain@test.com', email_verified: true },
};

describe('Firestore security rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'refresh-module',
    });
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();

      const existingClientDocRef = doc(db, 'clients', 'existingDoc');
      const existingNoteDocRef = doc(db, 'notes', 'existingDoc');

      await Promise.all([
        setDoc(existingClientDocRef, { foo: 'bar' }),
        setDoc(existingNoteDocRef, { foo: 'bar' }),
      ]);
    });
  });

  it('non admin user can not read/write from the clients collection', async () => {
    const db = getFirestore();
    const newDoc = doc(db, 'clients', 'testDoc');
    const existingDoc = doc(db, 'clients', 'existingDoc');

    await Promise.all([
      assertFails(getDoc(existingDoc)), //read
      assertFails(setDoc(newDoc, { foo: 'bar' })), // create
      assertFails(setDoc(existingDoc, { foo: 'bar' })), // update
      assertFails(deleteDoc(existingDoc)), // delete
    ]);
  });

  it('non admin user can not read/write from the notes collection', async () => {
    const db = getFirestore();
    const newDoc = doc(db, 'notes', 'testDoc');
    const existingDoc = doc(db, 'notes', 'existingDoc');

    await Promise.all([
      assertFails(getDoc(existingDoc)), //read
      assertFails(setDoc(newDoc, { foo: 'bar' })), // create
      assertFails(setDoc(existingDoc, { foo: 'bar' })), // update
      assertFails(deleteDoc(existingDoc)), // delete
    ]);
  });

  it('admin user can read/write from the clients collection', async () => {
    const db = getFirestore(adminAuth);
    const newDoc = doc(db, 'clients', 'testDoc');
    const existingDoc = doc(db, 'clients', 'existingDoc');

    await Promise.all([
      assertSucceeds(getDoc(existingDoc)), //read
      assertSucceeds(setDoc(newDoc, { foo: 'bar' })), // create
      assertSucceeds(setDoc(existingDoc, { foo: 'bar' })), // update
      assertSucceeds(deleteDoc(existingDoc)), // delete
    ]);
  });

  it('admin user can read/write from the notes collection', async () => {
    const db = getFirestore(adminAuth);
    const newDoc = doc(db, 'notes', 'testDoc');
    const existingDoc = doc(db, 'notes', 'existingDoc');

    await Promise.all([
      assertSucceeds(getDoc(existingDoc)), //read
      assertSucceeds(setDoc(newDoc, { foo: 'bar' })), // create
      assertSucceeds(setDoc(existingDoc, { foo: 'bar' })), // update
      assertSucceeds(deleteDoc(existingDoc)), // delete
    ]);
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });
});
