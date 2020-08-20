export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Загрузка...",
      succes: "Спасибо! Скоро мы с вами свяжемся",
      failure: "Что-то пошло не так...",
      spinner: "assets/img/spinner.gif",
      ok: "assets/img/ok.png",
      fail: "assets/img/fail.png",
    };
    this.path = "assets/questions.php";

  }

  clearInputs() {
    this.inputs.forEach((item) => (item.value = ""));
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll("[type=email]");

    mailInputs.forEach((input) =>
      input.addEventListener("keypress", (e) => {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) e.preventDefault();
      })
    );
  }

  maskInit() {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.modeEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    }

    function createMask(event) {
      let matrix = "+1 (___) ___-___";
      let i = 0;
      let def = matrix.replace(/\D/g, "");
      let val = this.value.replace(/\D/g, "");

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        let result;

        if (/[_\d]/.test(a) && i < val.length) {
          result = val.charAt(i++);
        } else if (i >= val.length) {
          result = "";
        } else {
          result = a;
        }

        return result;

        //   return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    const inputs = document.querySelectorAll(["[name=phone]"]);

    inputs.forEach((input) => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    return await res.text();
  }

  init() {
    this.checkMailInputs();
    this.maskInit();

    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        form.classList.add("animated", "fadeOutUp");
        setTimeout(() => {
          form.style.display = "none";
        }, 400);

        let statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
          text-align:center;
          margin-top:15px;
          font-size: 36px;
          color:#000;
        `;

        let textMessage = document.createElement("div");
        textMessage.textContent = this.message.loading;
        statusMessage.append(textMessage);

        let statusImg = document.createElement("img");
        statusImg.classList.add("animated", "fadeInUp");
        statusImg.setAttribute("src", this.message.spinner);
        statusMessage.append(statusImg);

        form.parentNode.append(statusMessage);

        const formData = new FormData(form);
        this.postData(this.path, formData)
          .then((res) => {
            console.log(res);
            statusImg.setAttribute("src", this.message.ok);
            textMessage.textContent = this.message.succes;
          })
          .catch((err) => {
            console.log(err);
            statusImg.setAttribute("src", this.message.fail);
            textMessage.textContent = this.message.failure;
          })
          .finally(() => {
            setTimeout(() => {
              this.clearInputs();
              form.style.display = "block";
              form.classList.remove("fadeOutUp");
              form.classList.add("fadeInUp");
              statusMessage.remove();
            }, 5000);
          });
      });
    });
  }
}