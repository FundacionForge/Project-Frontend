import { Course } from "../entities/courses.entity";
import { Degree } from "../entities/degree.entity";
import { Shift } from "../entities/shift.entity";

export interface StudentDto {
  dni:              string;
  name:             string;
  lastName:         string;
  motherLastName:   string;
  email:            string;
  phoneNumber:      string;
  address:          string;
  courses:          Course[];
  degrees:          Degree;
  shifts:           Shift;
}
