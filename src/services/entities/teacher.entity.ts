export interface Teacher {
  msg:                string;
  success:            string;
  data:               DataTeacher[];
}

interface DataTeacher {
    id:               string;
    dni:              string;
    name:             string;
    lastName:         string;
    motherLastName:   string;
    email:            string;
    phoneNumber:      string;
    address:          string;
}
