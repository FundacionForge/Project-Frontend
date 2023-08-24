export interface ResponseDegree {
  msg:                string;
  success:            string;
  data:               Degree[];
}

export interface Degree {
  id:                 string;
  name:               string;
  assignedRoom:       string;
  academicLevel:      string;
}
