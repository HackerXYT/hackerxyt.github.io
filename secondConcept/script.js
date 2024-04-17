"use strict";
var UserStatus;
if (!localStorage.getItem("PIN")) {
    localStorage.setItem("PIN", window.btoa('0000'))
}
(function (UserStatus) {
    UserStatus["LoggedIn"] = "Logged In";
    UserStatus["LoggingIn"] = "Logging In";
    UserStatus["LoggedOut"] = "Logged Out";
    UserStatus["LogInError"] = "Log In Error";
    UserStatus["VerifyingLogIn"] = "Verifying Log In";
})(UserStatus || (UserStatus = {}));
var Default;
(function (Default) {
    Default["PIN"] = window.atob(localStorage.getItem("PIN"));
})(Default || (Default = {}));
var WeatherType;
(function (WeatherType) {
    WeatherType["Cloudy"] = "Cloudy";
    WeatherType["Rainy"] = "Rainy";
    WeatherType["Stormy"] = "Stormy";
    WeatherType["Sunny"] = "Sunny";
})(WeatherType || (WeatherType = {}));
const defaultPosition = () => ({
    left: 0,
    x: 0
});
const N = {
    clamp: (min, value, max) => Math.min(Math.max(min, value), max),
    rand: (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
};
const T = {
    format: (date) => {
        const hours = T.formatHours(date.getHours()), minutes = date.getMinutes(), seconds = date.getSeconds();
        return `${hours}:${T.formatSegment(minutes)}`;
    },
    formatHours: (hours) => {
        return hours % 12 === 0 ? 12 : hours % 12;
    },
    formatSegment: (segment) => {
        return segment < 10 ? `0${segment}` : segment;
    }
};
const LogInUtility = {
    verify: async (pin) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (pin === Default.PIN) {
                    resolve(true);
                }
                else {
                    reject(`Invalid pin: ${pin}`);
                }
            }, N.rand(300, 700));
        });
    }
};
const useCurrentDateEffect = () => {
    const [date, setDate] = React.useState(new Date());
    React.useEffect(() => {
        const interval = setInterval(() => {
            const update = new Date();
            if (update.getSeconds() !== date.getSeconds()) {
                setDate(update);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [date]);
    return date;
};
const ScrollableComponent = (props) => {
    const ref = React.useRef(null);
    const [state, setStateTo] = React.useState({
        grabbing: false,
        position: defaultPosition()
    });
    const handleOnMouseDown = (e) => {
        setStateTo(Object.assign(Object.assign({}, state), {
            grabbing: true, position: {
                x: e.clientX,
                left: ref.current.scrollLeft
            }
        }));
    };
    const handleOnMouseMove = (e) => {
        if (state.grabbing) {
            const left = Math.max(0, state.position.left + (state.position.x - e.clientX));
            ref.current.scrollLeft = left;
        }
    };
    const handleOnMouseUp = () => {
        if (state.grabbing) {
            setStateTo(Object.assign(Object.assign({}, state), { grabbing: false }));
        }
    };
    return (React.createElement("div", { ref: ref, className: classNames("scrollable-component", props.className), id: props.id, onMouseDown: handleOnMouseDown, onMouseMove: handleOnMouseMove, onMouseUp: handleOnMouseUp, onMouseLeave: handleOnMouseUp }, props.children));
};
const WeatherSnap = () => {
    const [temperature] = React.useState(N.rand(25, 33));
    return (React.createElement("span", { className: "weather" },
        React.createElement("i", { className: "weather-type", className: "fa-duotone fa-sun" }),
        React.createElement("span", { className: "weather-temperature-value" }, temperature),
        React.createElement("span", { className: "weather-temperature-unit" }, "\u00B0C")));
};
const Reminder = () => {
    return (React.createElement("div", { className: "reminder" },
        React.createElement("div", { className: "reminder-icon" },
            React.createElement("i", { className: "fa-regular fa-bell" })),
        React.createElement("span", { className: "reminder-text" },
            "Next Tasco Task",
            React.createElement("span", { className: "reminder-time" }, "0PM"))));
};
const Time = () => {
    const date = useCurrentDateEffect();
    return (React.createElement("span", { className: "time" }, T.format(date)));
};
const Info = (props) => {
    return (React.createElement("div", { id: props.id, className: "info" },
        React.createElement(Time, null),
        React.createElement(WeatherSnap, null)));
};
const PinDigit = (props) => {
    const [hidden, setHiddenTo] = React.useState(false);
    React.useEffect(() => {
        if (props.value) {
            const timeout = setTimeout(() => {
                setHiddenTo(true);
            }, 500);
            return () => {
                setHiddenTo(false);
                clearTimeout(timeout);
            };
        }
    }, [props.value]);
    return (React.createElement("div", { className: classNames("app-pin-digit", { focused: props.focused, hidden }) },
        React.createElement("span", { className: "app-pin-digit-value" }, props.value || "")));
};

const Pin = () => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    const [pin, setPinTo] = React.useState("");
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (userStatus === UserStatus.LoggingIn || userStatus === UserStatus.LogInError) {
            ref.current.focus();
        }
        else {
            setPinTo("");
        }
    }, [userStatus]);
    React.useEffect(() => {
        if (pin.length === 4) {
            const verify = async () => {
                try {
                    setUserStatusTo(UserStatus.VerifyingLogIn);
                    if (await LogInUtility.verify(pin)) {
                        sessionStorage.setItem("Vox_Logged_In", true)
                        setUserStatusTo(UserStatus.LoggedIn);
                    }
                }
                catch (err) {
                    console.error(err);
                    setUserStatusTo(UserStatus.LogInError);
                }
            };
            verify();
        }
        if (userStatus === UserStatus.LogInError) {
            setUserStatusTo(UserStatus.LoggingIn);
        }
    }, [pin]);
    const handleOnClick = () => {
        ref.current.focus();
    };
    const handleOnCancel = () => {
        setUserStatusTo(UserStatus.LoggedOut);
    };
    const handleOnChange = (e) => {
        if (e.target.value.length <= 4) {
            setPinTo(e.target.value.toString());
        }
    };
    const getCancelText = () => {
        return (React.createElement("span", { id: "app-pin-cancel-text", onClick: handleOnCancel }, "Cancel"));
    };
    const getErrorText = () => {
        if (userStatus === UserStatus.LogInError) {
            return (React.createElement("span", { id: "app-pin-error-text" }, "Invalid"));
        }
    };
    return (React.createElement("div", { id: "app-pin-wrapper" },
        React.createElement("input", { disabled: userStatus !== UserStatus.LoggingIn && userStatus !== UserStatus.LogInError, id: "app-pin-hidden-input", maxLength: 4, ref: ref, type: "number", value: pin, onChange: handleOnChange }),
        React.createElement("div", { id: "app-pin", onClick: handleOnClick },
            React.createElement(PinDigit, { focused: pin.length === 0, value: pin[0] }),
            React.createElement(PinDigit, { focused: pin.length === 1, value: pin[1] }),
            React.createElement(PinDigit, { focused: pin.length === 2, value: pin[2] }),
            React.createElement(PinDigit, { focused: pin.length === 3, value: pin[3] })),
        React.createElement("h3", { id: "app-pin-label" },
            "Enter PIN",
            getErrorText(),
            " ",
            getCancelText())));
};
const MenuSection = (props) => {
    const getContent = () => {
        if (props.scrollable) {
            return (React.createElement(ScrollableComponent, { className: "menu-section-content" }, props.children));
        }
        return (React.createElement("div", { className: "menu-section-content" }, props.children));
    };
    return (React.createElement("div", { id: props.id, className: "menu-section" },
        React.createElement("div", { className: "menu-section-title" },
            React.createElement("i", { className: props.icon }),
            React.createElement("span", { className: "menu-section-title-text" }, props.title)),
        getContent()));
};
const QuickNav = () => {
    const getItems = () => {
        return [{
            id: 1,
            label: "Weather"
        }, {
            id: 2,
            label: "Social"
        }, {
            id: 3,
            label: "Notifications"
        }, {
            id: 4,
            label: "Personalized"
        }, {
            id: 5,
            label: "Background",
            onClick: custombg
        }].map((item) => {
            return (React.createElement("div", { key: item.id, className: "quick-nav-item clear-button", onClick: item.onClick },
                React.createElement("span", { className: "quick-nav-item-label" }, item.label)));
        });
    };
    return (React.createElement(ScrollableComponent, { id: "quick-nav" }, getItems()));
};
const Weather = () => {
    const getDays = () => {
        return [{
            id: 1,
            name: "Mon",
            temperature: N.rand(26, 34),
            weather: WeatherType.Sunny
        }, {
            id: 2,
            name: "Tues",
            temperature: N.rand(26, 34),
            weather: WeatherType.Sunny
        }, {
            id: 3,
            name: "Wed",
            temperature: N.rand(25, 29),
            weather: WeatherType.Cloudy
        }, {
            id: 4,
            name: "Thurs",
            temperature: N.rand(24, 27),
            weather: WeatherType.Rainy
        }, {
            id: 5,
            name: "Fri",
            temperature: N.rand(26, 34),
            weather: WeatherType.Stormy
        }, {
            id: 6,
            name: "Sat",
            temperature: N.rand(26, 34),
            weather: WeatherType.Sunny
        }, {
            id: 7,
            name: "Sun",
            temperature: N.rand(25, 29),
            weather: WeatherType.Cloudy
        }].map((day) => {
            const getIcon = () => {
                switch (day.weather) {
                    case WeatherType.Cloudy:
                        return "fa-duotone fa-clouds";
                    case WeatherType.Rainy:
                        return "fa-duotone fa-cloud-drizzle";
                    case WeatherType.Stormy:
                        return "fa-duotone fa-cloud-bolt";
                    case WeatherType.Sunny:
                        return "fa-duotone fa-sun";
                }
            };
            return (React.createElement("div", { key: day.id, className: "day-card" },
                React.createElement("div", { className: "day-card-content" },
                    React.createElement("span", { className: "day-weather-temperature" },
                        day.temperature,
                        React.createElement("span", { className: "day-weather-temperature-unit" }, "\u00B0C")),
                    React.createElement("i", { className: classNames("day-weather-icon", getIcon(), day.weather.toLowerCase()) }),
                    React.createElement("span", { className: "day-name" }, day.name))));
        });
    };
    return (React.createElement(MenuSection, { icon: "fa-solid fa-sun", id: "weather-section", scrollable: true, title: "How does it look like?" }, getDays()));
};
const notifications = {
    "notifications": [
      {
        "id": "1",
        "app": "Gateway",
        "timestamp": "2024-03-14 18:56:54",
        "content": "2FA Disabled!",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "2",
        "app": "Gateway",
        "timestamp": "2024-03-14 18:56:55",
        "content": "2FA Enabled!",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "3",
        "app": "Secureline",
        "timestamp": "2024-03-14 20:44:56",
        "content": "New message from bantou",
        "image": "bantou"
      },
      {
        "id": "4",
        "app": "Gateway",
        "timestamp": "2024-03-15 08:16:03",
        "content": "IP [91.140.28.29] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "5",
        "app": "Gateway",
        "timestamp": "2024-03-15 15:15:26",
        "content": "IP [109.178.150.42] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "6",
        "app": "Secureline",
        "timestamp": "2024-03-15 15:16:09",
        "content": "New message from Kyriakos",
        "image": "Kyriakos"
      },
      {
        "id": "7",
        "app": "Gateway",
        "timestamp": "2024-03-15 19:15:41",
        "content": "IP [46.177.157.212] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "8",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:24:23",
        "content": "IP [89.39.107.205] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "9",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:03",
        "content": "IP [79.131.254.135] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "10",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:10",
        "content": "IP [109.178.191.80] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "11",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:13",
        "content": "IP [109.178.197.247] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "12",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:16",
        "content": "IP [109.178.220.111] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "13",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:18",
        "content": "IP [109.178.253.124] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "14",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:22",
        "content": "IP [54.37.70.70] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "15",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:24",
        "content": "IP [149.210.60.177] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "16",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:27",
        "content": "IP [109.178.197.116] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "17",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:32",
        "content": "IP [109.178.196.120] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "18",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:34",
        "content": "IP [149.7.35.218] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "19",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:37",
        "content": "IP [109.178.220.244] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "20",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:39",
        "content": "IP [69.50.94.77] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "21",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:44",
        "content": "IP [89.39.107.203] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "22",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:54",
        "content": "IP [109.178.201.71] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "23",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:25:59",
        "content": "IP [89.39.107.205] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "24",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:26:01",
        "content": "IP [89.39.107.203] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "25",
        "app": "Gateway",
        "timestamp": "2024-03-16 12:59:21",
        "content": "IP [79.131.254.135] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "26",
        "app": "Gateway",
        "timestamp": "2024-03-18 10:17:14",
        "content": "Profile Picture Changed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "27",
        "app": "Gateway",
        "timestamp": "2024-03-18 10:18:00",
        "content": "Profile Picture Changed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "28",
        "app": "Gateway",
        "timestamp": "2024-03-19 07:38:16",
        "content": "2FA Disabled!",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "29",
        "app": "Gateway",
        "timestamp": "2024-03-19 07:38:18",
        "content": "2FA Enabled!",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "30",
        "app": "Secureline",
        "timestamp": "2024-03-19 08:00:33",
        "content": "New message from AIT",
        "image": "AIT"
      },
      {
        "id": "31",
        "app": "Gateway",
        "timestamp": "2024-03-21 09:05:40",
        "content": "IP [109.178.203.193] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "32",
        "app": "Gateway",
        "timestamp": "2024-03-21 21:41:26",
        "content": "IP [79.131.254.135] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "33",
        "app": "Gateway",
        "timestamp": "2024-03-23 14:00:29",
        "content": "IP [185.177.124.88] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "34",
        "app": "Gateway",
        "timestamp": "2024-03-27 07:40:35",
        "content": "IP [109.178.159.25] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "35",
        "app": "Gateway",
        "timestamp": "2024-03-28 09:22:07",
        "content": "IP [109.178.162.213] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "36",
        "app": "Gateway",
        "timestamp": "2024-03-29 09:41:50",
        "content": "IP [91.140.31.70] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "37",
        "app": "Gateway",
        "timestamp": "2024-03-29 09:52:12",
        "content": "IP [91.140.28.29] removed",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      },
      {
        "id": "38",
        "app": "Gateway",
        "timestamp": "2024-03-29 19:32:46",
        "content": "IP [46.190.71.217] added",
        "image": "https://team50.sytes.net/notifications_assets/Gateway.png"
      }
    ]
  }
const Tools = () => {

    const getTools = () => {
        return [{
            id: 1,
            image: `https://team50.sytes.net/notifications_assets/${notifications.notifications[notifications.notifications.length - 1].app}.png`,
            label: notifications.notifications[notifications.notifications.length - 1].app,
            name: notifications.notifications[notifications.notifications.length - 1].content
        }, {
            id: 3,
            image: `https://team50.sytes.net/notifications_assets/${notifications.notifications[notifications.notifications.length - 2].app}.png`,
            label: notifications.notifications[notifications.notifications.length - 2].app,
            name: notifications.notifications[notifications.notifications.length - 2].content
        }, {
            icon: "fa-solid fa-triangle-exclamation",
            id: 4,
            image: `https://team50.sytes.net/notifications_assets/${notifications.notifications[notifications.notifications.length - 3].app}.png`,
            label: notifications.notifications[notifications.notifications.length - 3].app,
            name: notifications.notifications[notifications.notifications.length - 3].content
        }, {
            id: 5,
            image: `https://team50.sytes.net/notifications_assets/${notifications.notifications[notifications.notifications.length - 4].app}.png`,
            label: notifications.notifications[notifications.notifications.length - 4].app,
            name: notifications.notifications[notifications.notifications.length - 4].content
        }, {
            id: 6,
            image: `https://team50.sytes.net/notifications_assets/${notifications.notifications[notifications.notifications.length - 5].app}.png`,
            label: notifications.notifications[notifications.notifications.length - 5].app,
            name: notifications.notifications[notifications.notifications.length - 5].content
        }, {
            id: 7,
            image: `https://team50.sytes.net/notifications_assets/${notifications.notifications[5].app}.png`,
            label: notifications.notifications[5].app,
            name: notifications.notifications[5].content
        }].map((tool) => {
            const styles = {
                backgroundImage: `url(${tool.image})`
            };
            return (React.createElement("div", { key: tool.id, className: "tool-card" },
                React.createElement("div", { className: "tool-card-background background-image", style: styles }),
                React.createElement("div", { className: "tool-card-content" },
                    React.createElement("div", { className: "tool-card-content-header" },
                        React.createElement("span", { className: "tool-card-label" }, tool.label),
                        React.createElement("span", { className: "tool-card-name" }, tool.name)),
                    React.createElement("i", { className: classNames(tool.icon, "tool-card-icon") }))));
        });
    };
    return (React.createElement(MenuSection, { icon: "fa-sharp fa-solid fa-bell", id: "tools-section", title: "Notifications" }, getTools()));
};
const Restaurants = () => {
    const getRestaurants = () => {
        return [{
            desc: "Find new friends in Evox",
            id: 1,
            image: "PH.png",
            title: "Search"
        }, {
            desc: "See your friends",
            id: 2,
            image: "PH.png",
            title: "Friends"
        }, {
            desc: "See which people want to befriend you.",
            id: 3,
            image: "PH.png",
            title: "Requests"
        }, {
            desc: "Only dangerous people are shown here.",
            id: 4,
            image: "PH.png",
            title: "Blocked"
        }].map((restaurant) => {
            const styles = {
                backgroundImage: `url(${restaurant.image})`
            };
            return (React.createElement("div", { key: restaurant.id, className: "restaurant-card background-image", style: styles },
                React.createElement("div", { className: "restaurant-card-content" },
                    React.createElement("div", { className: "restaurant-card-content-items" },
                        React.createElement("span", { className: "restaurant-card-title" }, restaurant.title),
                        React.createElement("span", { className: "restaurant-card-desc" }, restaurant.desc)))));
        });
    };
    return (React.createElement(MenuSection, { icon: "fa-solid fa-user-group", id: "restaurants-section", title: "Evox Social" }, getRestaurants()));
};
const Movies = () => {
    const getMovies = () => {
        return [{
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 1,
            icon: "fa-solid fa-galaxy",
            image: "personalize.png",
            title: "Placeholder"
        }, {
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 2,
            icon: "fa-solid fa-hat-wizard",
            image: "personalize.png",
            title: "Placeholder2"
        }, {
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 3,
            icon: "fa-solid fa-broom-ball",
            image: "personalize.png",
            title: "Placeholder3"
        }, {
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 4,
            icon: "fa-solid fa-starship-freighter",
            image: "personalize.png",
            title: "Placeholder4"
        }].map((movie) => {
            const styles = {
                backgroundImage: `url(${movie.image})`
            };
            const id = `movie-card-${movie.id}`;
            return (React.createElement("div", { key: movie.id, id: id, className: "movie-card" },
                React.createElement("div", { className: "movie-card-background background-image", style: styles }),
                React.createElement("div", { className: "movie-card-content" },
                    React.createElement("div", { className: "movie-card-info" },
                        React.createElement("span", { className: "movie-card-title" }, movie.title),
                        React.createElement("span", { className: "movie-card-desc" }, movie.desc)),
                    React.createElement("i", { className: movie.icon }))));
        });
    };
    return (React.createElement(MenuSection, { icon: "fa-solid fa-person", id: "movies-section", scrollable: true, title: "Picked For You, ${username}" }, getMovies()));
};
const UserStatusButton = (props) => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    const handleOnClick = () => {

        setUserStatusTo(props.userStatus);
    };
    return (React.createElement("button", { id: props.id, className: "user-status-button clear-button", disabled: userStatus === props.userStatus, type: "button", onClick: handleOnClick },
        React.createElement("i", { className: props.icon })));
};
const Menu = () => {
    return (React.createElement("div", { id: "app-menu" },
        React.createElement("div", { id: "app-menu-content-wrapper" },
            React.createElement("div", { id: "app-menu-content" },
                React.createElement("div", { id: "app-menu-content-header" },
                    React.createElement("div", { className: "app-menu-content-header-section" },
                        React.createElement(Info, { id: "app-menu-info" }),
                        React.createElement(Reminder, null)),
                    React.createElement("div", { className: "app-menu-content-header-section", onClick: delSS },
                        React.createElement(UserStatusButton, { icon: "fa-solid fa-arrow-right-from-arc", id: "sign-out-button", userStatus: UserStatus.LoggedOut }))
                ),


                React.createElement(QuickNav, null),
                React.createElement("a", { id: "youtube-link", className: "clear-button", href: "https://www.youtube.com/c/hackerxyt", target: "_blank" },
                    React.createElement("i", { className: "fa-brands fa-youtube" }),
                    React.createElement("span", null, "H A C K E R X")),
                React.createElement(Weather, null),
                React.createElement(Restaurants, null),
                React.createElement(Tools, null),
                React.createElement(Movies, null)))));
};
const Background = () => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    const handleOnClick = () => {
        if (userStatus === UserStatus.LoggedOut) {
            setUserStatusTo(UserStatus.LoggingIn);
        }
    };
    return (React.createElement("div", { id: "app-background", onClick: handleOnClick },
        React.createElement("div", { id: "app-background-image", className: "background-image" })));
};
const Loading = () => {
    return (React.createElement("div", { id: "app-loading-icon" },
        React.createElement("i", { className: "fa-solid fa-spinner-third" })));
};
const AppContext = React.createContext(null);
const App = () => {
    let [userStatus, setUserStatusTo] = ["active", "1"];
    if (localStorage.getItem("PIN")) {
        if (sessionStorage.getItem("Vox_Logged_In") === "true") {
            [userStatus, setUserStatusTo] = React.useState(UserStatus.LoggedIn);
        } else {
            [userStatus, setUserStatusTo] = React.useState(UserStatus.LoggedOut);
        }
    }

    const getStatusClass = () => {
        return userStatus.replace(/\s+/g, "-").toLowerCase();
    };
    return (React.createElement(AppContext.Provider, { value: { userStatus, setUserStatusTo } },
        React.createElement("div", { id: "app", className: getStatusClass() },
            React.createElement(Info, { id: "app-info" }),
            React.createElement(Pin, null),
            React.createElement(Menu, null),
            React.createElement(Background, null),
            React.createElement("div", { id: "sign-in-button-wrapper" },
                React.createElement(UserStatusButton, { icon: "fa-solid fa-arrow-right-to-arc", id: "sign-in-button", userStatus: UserStatus.LoggingIn })),
            React.createElement(Loading, null))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));

function custombg() {
    if(!sessionStorage.getItem("cbg-d")) {
        sessionStorage.setItem("cbg-d", "true")
        let blur = localStorage.getItem("cbg-blur");
        let backgroundElement = document.getElementById("app-background-image");
    
        if (localStorage.getItem("cbg")) {
            let name = localStorage.getItem("cbg");
    
            if (name === "default_bg.png") {
                backgroundElement.style.background = "radial-gradient(circle, #400000, #000000)";
            } else if (name === "stock1.jpg" || name === "stock2.jpg" || name === "stock4.jpg") {
                let backgroundImage = `url('../t50-gateway-alpha/bgs/${name}')`;
                //let blurStyle = blur ? `blur(${blur}px)` : `blur(10px)`;
                backgroundElement.style.backgroundImage = backgroundImage;
                backgroundElement.style.backgroundSize = "cover";
                backgroundElement.style.backgroundPosition = "center";
                //backgroundElement.style.filter = blurStyle;
            } else if (name.includes("#")) {
                backgroundElement.style.background = `radial-gradient(circle, ${name}, #000000)`;
            } else {
                //let blurStyle = blur ? `blur(${blur}px)` : `blur(10px)`;
                backgroundElement.style.backgroundImage = `url('${name}')`;
                backgroundElement.style.backgroundSize = "cover";
                backgroundElement.style.backgroundPosition = "center";
                //backgroundElement.style.filter = blurStyle;
            }
        } else {
            console.log('No Custom BG')
        }
    } else {
        sessionStorage.removeItem("cbg-d")
        let backgroundElement = document.getElementById("app-background-image");
        backgroundElement.style.background = `radial-gradient(circle, #7e0000, #000000)`;
        backgroundElement.style.filter = "";
    }
    

}
custombg()