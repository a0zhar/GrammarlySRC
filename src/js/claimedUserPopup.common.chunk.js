(self.webpackChunk = self.webpackChunk || []).push([
  [7485],
  {
    70607: (e, o, a) => {
      a.r(o), a.d(o, { ClaimedUserPopup: () => s });
      var t = a(27378),
        c = a(67166),
        n = a(24606),
        r = a(40412);
      const s = ({ onClose: e, onClickMoreInfo: o }) =>
        t.createElement(c.X, {
          onClose: e,
          mainContent: t.createElement(
            "div",
            {
              "data-grammarly-part": "claimed-user-popup-main-content",
              className: r.claimedUserPopup,
            },
            t.createElement("div", { className: r.claimedUserPopupIcon }),
            t.createElement(
              "div",
              { className: r.claimedUserPopupTitle },
              "Action required!"
            ),
            t.createElement(
              "div",
              { className: r.claimedUserPopupText },
              "Your organization wants to add you to their team account. You'll need to either join the team account or change the email you use for this account."
            ),
            t.createElement(
              n.z,
              {
                onClick: o,
                kind: "success",
                className: r.claimedUserPopupMoreInfoButton,
                round: true,
              },
              "More info"
            )
          ),
          size: "medium",
        });
    },
    40412: (e) => {
      e.exports = {
        claimedUserPopup: "BHPcZ",
        claimedUserPopupIcon: "_3PVR9",
        claimedUserPopupTitle: "uDbdk",
        claimedUserPopupText: "_3M3kr",
        claimedUserPopupMoreInfoButton: "K-fe5",
        spin: "_3-D0u",
      };
    },
  },
]);
