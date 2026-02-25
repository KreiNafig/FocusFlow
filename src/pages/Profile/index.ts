export interface ProfileUserProps {
    user: {
      picture: { large: string };
      name: { title: string; first: string; last: string };
      location: { country: string; city: string };
    } | null;
  }

export interface IUser {
    user: {
        gender: string;
        dob: { age: number };
        phone: string;
        registered: { date: string; age: number};
        login: { username: string };
    } | null;
}