export interface Course {
  data:               DataCourse[]
  msg:                string;
  success:            string;
}

interface DataCourse {
  id:                 string;
  name:               string;
  description:        string;
  image:              string;
}
