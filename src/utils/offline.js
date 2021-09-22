import { useSnackbar } from "notistack";

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

const { enqueueSnackbar, closeSnackbar } = useSnackbar();

let offlineSnackbar;

function updateOnlineStatus(event) {
  if (navigator.onLine !== "online") {
    offlineSnackbar = enqueueSnackbar("I love hooks");
  } else {
    if (offlineSnackbar) {
      closeSnackbar(offlineSnackbar);
    }
  }
}
