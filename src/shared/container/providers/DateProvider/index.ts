import { container } from "tsyringe";

import IDateProvider from "./IDateProvider";
import { DateFnsProvider } from "./implementations/DateFnsProvider";

container.registerInstance<IDateProvider>(
  "DateProvider",
  container.resolve(DateFnsProvider)
);
