import * as React from "react";
import { ReactComponent as Check } from "./check.svg";

export const Item = ({ item, onRemove }) => {
  return (
    <li className="item">
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button
          className="button button--small"
          onClick={() => onRemove(item)}
          aria-label="Dismiss"
        >
          <Check />
        </button>
      </span>
    </li>
  );
};
