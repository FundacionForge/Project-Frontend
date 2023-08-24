export interface ResponseQualification {
  msg:                string;
  success:            string;
  data:               Qualification[];
}

export interface Qualification {
  id:                 string;
  name:               string;
}
