export interface TeacherDto {
  dni:              string;
  name:             string;
  lastName:         string;
  motherLastName:   string;
  email:            string;
  phoneNumber:      string;
  address:          string;

  degrees:          number[];
  courses:          string;
  shifts:           string;
  qualifications:   string;
}
