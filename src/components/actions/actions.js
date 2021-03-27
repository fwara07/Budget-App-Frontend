export const getAllCategories = (setCategoriesState) => {
  fetch("https://budget-planning.herokuapp.com/api/category", {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      localStorage.setItem("categories", JSON.stringify(json));
    });
};

export const getBalance = (setBalanceState, state) => {
  fetch("https://budget-planning.herokuapp.com/api/get-balance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ category: state.category }),
  })
    .then((res) => res.json())
    .then((json) => {
      setBalanceState(json);
    });
};

export const getTotalHistoryData = (setHistoryData) => {
  fetch("https://budget-planning.herokuapp.com/api/total-history", {
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      setHistoryData(json);
    });
};
