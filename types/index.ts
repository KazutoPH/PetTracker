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
  name: string;
  image: string;
  breed: string;
  date_of_birth: Date;
  gender: string;
  color: string;
}
