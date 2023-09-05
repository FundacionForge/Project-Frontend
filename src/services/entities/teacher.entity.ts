import { Course } from "./courses.entity";
import { Degree } from "./degree.entity";
import { Shift } from "./shift.entity";
import { Qualification } from './qualification.entity';

export interface ResponseTeacher {
  msg:                      string;
  success:                  string;
  data:                     Teacher[];
}

export interface Teacher {
  id:                       string;
  dni:                      string;
  name:                     string;
  lastName:                 string;
  motherLastName:           string;
  email:                    string;
  phoneNumber:              string;
  address:                  string;
  degrees:                  Degree[];
  shifts:                   Shift;
  courses:                  Course;
  qualification:            Qualification
}
