export interface ResponseTeacher {
  msg:                string;
  success:            string;
  data:               Teacher[];
}

export interface Teacher {
    id:               string;
    dni:              string;
    name:             string;
    lastName:         string;
    motherLastName:   string;
    email:            string;
    phoneNumber:      string;
    address:          string;
}
