import { RootState } from '@shared/stores/rootTypes';

const sourceAppSelector = (state: RootState) => state.user.sourceApp;
const selectedProfileSelector = (state: RootState) => state.user.selectedProfile;
const loginDateSelector = (state: RootState) => state.user.loginDate;

export { sourceAppSelector, selectedProfileSelector, loginDateSelector };
