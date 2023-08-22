export interface Degree {
  msg:                string;
  success:            string;
  data:               DataDegree[];
}

interface DataDegree {
  id:                 string;
  name:               string;
  assignedRoom:       string;
  academicLevel:      string;
}
