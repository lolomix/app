import NoNftNotificationContent from "./NoNftNotificationContent";
import Card from "../styled/Card";

/**
 * @param {boolean|undefined} fullHeight
 * @param {object} rest
 * @returns {JSX.Element}
 * @constructor
 */
function NoNftNotificationCard({ fullHeight, ...rest }) {
  return (
    <Card fullHeight={fullHeight} {...rest}>
      <NoNftNotificationContent fullHeight={fullHeight} />
    </Card>
  );
}

export default NoNftNotificationCard;
