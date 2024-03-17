import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { useTheme, useThemeUpdate } from "../../../provider/Theme";

const User = () => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-xl-block">
            <div
              className={`user-status ${
                window.location.pathname.split("/")[2] === "invest" ? "user-status-unverified" : ""
              }`}
            >
              {window.location.pathname.split("/")[2] === "invest" ? "Unverified" : "Admininstrator"}
            </div>
            <div className="user-name dropdown-indicator">Ryzen</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>RZ</span>
            </div>
            <div className="user-info">
              <span className="lead-text">Ryzen</span>
              <span className="sub-text">Ryzen@test.com</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem
              link="/"
              icon="user-alt"
              onClick={toggle}
            >
              View Profile
            </LinkItem>
            <LinkItem
              link="/"
              icon="setting-alt"
              onClick={toggle}
            >
              Account Setting
            </LinkItem>
            <LinkItem
              link="/"
              icon="activity-alt"
              onClick={toggle}
            >
              Login Activity
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href="#">
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
