export interface UserType {
  fullname: string;
  email: string;
  password: string;
  contact: number;
  address: number;
  onboarding: boolean;
  image: String;
}

export interface PetType {
  _id: string;
  name: string;
  image: string;
  breed: string;
  date_of_birth: Date;
  gender: string;
  color: string;
  qr: string;
}
