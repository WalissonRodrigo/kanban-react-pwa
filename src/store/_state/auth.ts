/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'recoil';
import { AES, enc } from 'crypto-js';

const storage = JSON.parse(localStorage.getItem('user') ?? JSON.stringify({}));
let auth: any;
if(storage.length > 0) {
  auth = {
    auth: storage.auth,
    user: AES.decrypt(
			storage.user,
			'5909aaee-5d40-46d4-bf4a-e38314a77827',
		).toString(enc.Utf8)
  }
}
const authAtom = atom({
  key: 'auth',
  // get initial state from local storage to enable user to stay logged in
  default: auth || storage,
});

export { authAtom };
