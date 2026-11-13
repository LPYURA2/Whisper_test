import { SIGNAL_SERVER } from "../network/stand-config.js";

const element = document.getElementById("stand-worker-status");
if (element) {
    element.textContent = SIGNAL_SERVER
        ? "Тестовый Worker настроен. До signaling-ready соединение ещё не готово. Создайте отдельный профиль и передайте его ID для допуска стенда."
        : "Worker ещё не настроен: ожидается его фактический WSS-адрес. Можно создать тестовый профиль и скопировать только его ID кнопкой «Копировать ID»; данные production не читаются.";
}
