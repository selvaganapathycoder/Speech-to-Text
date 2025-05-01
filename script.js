const output = document.getElementById("output");
const list = document.getElementById("list");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

let finalText = "";

recognition.onresult = (e) => {
  let text = "";
  for (let i = e.resultIndex; i < e.results.length; i++) {
    const result = e.results[i][0].transcript;
    if (e.results[i].isFinal) {
      finalText += result + " ";
    } else {
      text += result;
    }
  }
  output.textContent = finalText + text;
};

function startSpeech() {
  finalText = "";
  recognition.start();
}

function stopSpeech() {
  recognition.stop();
}

function addToList() {
  const text = output.textContent.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  const btn = document.createElement("button");
  btn.textContent = "Remove";
  btn.className = "removeBtn";
  btn.onclick = () => li.remove();

  li.appendChild(btn);
  list.appendChild(li);

  output.textContent = "";
  finalText = "";
}