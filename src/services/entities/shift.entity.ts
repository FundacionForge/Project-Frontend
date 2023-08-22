export interface Shift {
  msg:                string;
  success:            string;
  data:               DataShift[];
}

interface DataShift {
  id:               string;
  name:             string;
}
