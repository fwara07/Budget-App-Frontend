export const getAllCategories = async (setCategoriesState) => {
  let response = await fetch(
    "https://budget-planning.herokuapp.com/api/category",
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    }
  );
  let json = await response.json();
  localStorage.setItem("categories", JSON.stringify(json));
  return json;
};

export const getBalance = async (setBalanceState, state) => {
  let response = await fetch(
    "https://budget-planning.herokuapp.com/api/get-balance",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ category: state.category }),
    }
  );
  let json = await response.json();
  setBalanceState(json);
};

export const getTotalHistoryData = async (setHistoryData) => {
  let response = await fetch(
    "https://budget-planning.herokuapp.com/api/total-history",
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    }
  );
  let json = await reponse.json();
  setHistoryData(json);
};
