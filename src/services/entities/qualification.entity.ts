export interface Qualification {
  msg:                string;
  success:            string;
  data:               DataQualification[];
}

interface DataQualification {
  id:                 string;
  name:               string;
}
