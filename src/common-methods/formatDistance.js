import { formatDistance } from "date-fns";

const useFormateDistanceDate = (date) =>
  formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

export default useFormateDistanceDate;
