let socket = io();

startButton.addEventListener("click", () => {
  socket.emit(startGame);
});

socket.on("startGame", () => {
  hideStartButton();
});

function hideStartButton() {
  startButton.style.display = "none";
}
