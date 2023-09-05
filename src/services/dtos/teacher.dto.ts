import { Course } from "../entities/courses.entity";
import { Degree } from '../entities/degree.entity';
import { Qualification } from "../entities/qualification.entity";
import { Shift } from "../entities/shift.entity";

export interface TeacherDto {
  dni:              string;
  name:             string;
  lastName:         string;
  motherLastName:   string;
  email:            string;
  phoneNumber:      string;
  address:          string;

  degrees:          Degree[];
  courses:          Course;
  shifts:           Shift;
  qualification:    Qualification;
}
