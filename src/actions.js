import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  const toasterEkle = toast.loading("Ekliyorum...", {
    position: "top-right",
  });
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEkle(res.data.json));
        toast.update(toasterEkle, {
          render: "Notunuz eklendi.",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  const toasterSil = toast.loading("Siliyorum...", {
    position: "top-right",
  });
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSil(res.data.data));
        toast.update(toasterSil, {
          render: "Notunuz silindi.",
          type: "warning",
          isLoading: false,
          autoClose: 2000,
        });
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
      }
    })
    .catch((error) => console.log(error));
};
