import crypto from "crypto";
import { Socket } from "net";
import { ControllerResponse, Order, Product } from ".";
import menu from "../data/menu.json";

let orders: Order[] = [];
let order: Order = { price: 0 };

export function orderController(
  socket: Socket,
  options: string[],
): ControllerResponse<Order> {
  switch (options[1]) {
    case "create":
      order.id = crypto.randomUUID();

      if (!order.id) {
        return {
          message: `FINISH:invalid argument; no order placed;\nuse CREATE command to place a order.`,
          error: "BAD_REQUEST",
        };
      }

      order.items = options.slice(2, options.length);
      if (order.items.length > 0) {
        for (let id of order.items) {
          let item = menu.products.find(
            (item) => item.id === Number(id),
          ) as unknown as Product;
          order.price += item.price;
          if (!item) {
            return {
              message: `Item #${id} not found on menu`,
              error: "ITEM_NOT_FOUND",
            };
          }
        }
        order.status = "AWAITING_PAYMENT";
        orders.push(order);

        order = { price: 0 };
        return {
          message: `Order #${orders.length} placed successfully`,
          data: orders[orders.length - 1],
        };
      }
      return {
        message: `No items to place on order`,
        error: "NO_ITEMS",
      };
    case "remove":
      let itemId = options[2];
      if (!itemId) {
        return {
          message: `FINISH:invalid argument; no order placed;\nuse CREATE command to place a order.`,
          error: "BAD_REQUEST",
        };
      }

      orders = orders.filter((i) => {
        let keep = true;
        if (i.items) {
          for (let id of i.items) {
            if (id === itemId) {
              keep = false;
              break;
            }
          }
        }
        return keep;
      });
      if (order.items) {
        order.items = order.items.filter((i) => i !== itemId);
      }

      order = { price: 0 };
      return {
        message: `Order #${orders.length} removed successfully`,
        data: orders[orders.length - 1],
      };

    case "list":
      return { data: orders };

    case "payment":
      let cash = Number(options[3]);
      order.id = options[2];
      order = orders.find((item) => order.id === item.id) as unknown as Order;
      if (order) {
        if (isNaN(cash) || cash < order.price) {
          return {
            message: "Value not sufficient. Payment not completed. ",
            error: "VALUE_TOO_SMALL",
          };
        }
      }
      order.status = "PAID";
      order.change = cash - order.price;

      return {
        message: `Payment of order #${order.id} successful`,
        data: order,
      };
    case "findById":
      let item = menu.products.find((item) => item.id);
      return {
        data: item,
      };
    case "details":
      order.id = options[2];

      return {
        data: {
          total_price: order.price,
        },
      };

    case "deliver":
      let id = options[2];
      order = orders.find((item) => id === item.id) as unknown as Order;
      if (!order) {
        return {
          message: "Order not found",
          error: "ORDER_NOT_FOUND",
        };
      }

      order.deliver_man = options[3];
      if (order.status === "PAID") order.status = "DELIVERED";
      else {
        return {
          message: "Order not paid",
          error: "NOT_PAID",
        };
      }

      return {
        message: "Order delivered successfully",
        data: order,
      };

    default:
      return {
        message:
          "Invalid option; try CREATE | REMOVE | PAYMENT | DELIVER | LIST | DETAILS",
        error: "INVALID_ORDER_OPTION",
      };
  }
}
