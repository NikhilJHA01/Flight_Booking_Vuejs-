import Vue from "vue";
import { Button } from "element-ui";
import {
  Menu,
  MenuItem,
  Submenu,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  DatePicker,
  RadioGroup,
  RadioButton,
  Radio,
  Row,
  Card,
  Col,
  Dialog,
  InputNumber
} from "element-ui";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

locale.use(lang);

Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(InputNumber);
Vue.use(Card);
