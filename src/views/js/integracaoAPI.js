const baseURL = "http://localhost:5000";

async function PostAPI(route, body) {
  const token = await BuscaToken();

  const result = await fetch(baseURL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    body: JSON.stringify(body),
  }).then(async function (response) {
    if (response.status == 401) {
      alert("Necessário fazer login!");
      window.location.href = "./login.html";
    }

    const data = await response.json();
    return data;
  });

  return result;
}

async function GetAPI(route) {
  const token = await BuscaToken();

  const result = await fetch(baseURL + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(async function (response) {
    if (response.status == 401) {
      alert("Necessário fazer login!");
      Logoff();
    }
    const data = await response.json();
    return data;
  });

  return result;
}

async function DeleteAPI(route) {
  const token = await BuscaToken();

  const result = await fetch(baseURL + route, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then(async function (response) {
    if (response.status == 401) {
      alert("Necessário fazer login!");
      Logoff();
    }
    const data = await response.json();
    return data;
  });

  return result;
}

async function PutAPI(route, body) {
  const token = await BuscaToken();

  const result = await fetch(baseURL + route, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  }).then(async function (response) {
    if (response.status == 401) {
      alert("Necessário fazer login!");
      window.location.href = "./login.html";
      return;
    }

    const data = await response.json();
    return data;
  });

  return result;
}

async function BuscaToken() {
  return localStorage.getItem("token");
}

async function ValidaToken() {
  const token = await BuscaToken();

  if (!token) window.location.href = "./login.html";
}

async function Logoff() {
  localStorage.removeItem("token");

  window.location.href = "./login.html";
}
