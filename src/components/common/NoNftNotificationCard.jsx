import { Card, CardContent } from "@mui/material";
import NoNftNotificationContent from "./NoNftNotificationContent";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NoNftNotificationCard(props) {
  return (
    <Card {...props}>
      <CardContent>
        <NoNftNotificationContent />
      </CardContent>
    </Card>
  );
}

export default NoNftNotificationCard;
