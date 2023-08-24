export interface ResponseCourse {
  data:               Course[]
  msg:                string;
  success:            string;
}

export interface Course {
  id:                 string;
  name:               string;
  description:        string;
  image:              string;
}
