import { Course } from "./courses.entity";
import { Degree } from "./degree.entity";
import { Shift } from "./shift.entity";

export interface ResponseStudent {
  msg:                string;
  success:            string;
  data:               Student[];
}

export interface Student {
  id:                 string;
  dni:                string;
  name:               string;
  lastName:           string;
  motherLastName:     string;
  email:              string;
  phoneNumber:        string;
  address:            string;
  degrees:            Degree;
  shifts:             Shift;
  courses:            Course[];
}
