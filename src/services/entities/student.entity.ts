export interface Student {
  msg:                string;
  success:            string;
  data:               DataStudent[];
}

interface DataStudent {
    id:               string;
    dni:              string;
    name:             string;
    lastName:         string;
    motherLastName:   string;
    email:            string;
    phoneNumber:      string;
    address:          string;
}
