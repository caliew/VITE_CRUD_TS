export interface UpdateLoginDateData {
  Details: {
    LastLoginDate: string | null;
  };
}

export interface UpdateLoginDateResult {
  Data: UpdateLoginDateData;
}
