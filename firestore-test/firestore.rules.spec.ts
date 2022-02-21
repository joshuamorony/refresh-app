import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
  TokenOptions,
} from '@firebase/rules-unit-testing';

let testEnv: RulesTestEnvironment;

const getFirestore = (authUser?: { uid: string; token: TokenOptions }) =>
  authUser
    ? testEnv.authenticatedContext(authUser.uid, authUser.token).firestore()
    : testEnv.unauthenticatedContext().firestore();

describe('Firestore security rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'refresh-module',
    });
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it('can not read from the clients collection', async () => {
    const db = getFirestore();

    const testDoc = db.collection('clients').doc('testDoc');
    await assertFails(testDoc.get());
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });
});
