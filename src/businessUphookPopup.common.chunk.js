(self.webpackChunk = self.webpackChunk || []).push([
  [6371],
  {
    97751: (e, t, n) => {
      n.r(t), n.d(t, { BusinessUphookPopup: () => r });
      var a = n(5872),
        l = n(88326),
        o = n(27378),
        s = n(45801),
        i = n(39047),
        c = n(19232);
      const r = (e) => {
        const {
            domainCategory: t,
            isFlipped: n,
            popupType: r,
            showDismissPermanently: p,
          } = e,
          m = o.useMemo(() => (0, i.cO)(t), [t]),
          u = o.useMemo(() => (0, i.aC)(t), [t]),
          _ = (0, a.cs)(
            c.gButtonPopup,
            c.businessUphookPopup,
            n && c.isFlipped,
            r === s.L.statistics && c.headerGraphic
          ),
          d = () =>
            m
              ? o.createElement(
                  o.Fragment,
                  null,
                  o.createElement(
                    "div",
                    { className: (0, a.cs)(c.text, c.listTitle) },
                    m.title
                  ),
                  o.createElement(
                    "ul",
                    { className: c.bulletedList },
                    m.list.map((e, t) =>
                      o.createElement(
                        "li",
                        { key: t, className: (0, a.cs)(c.text, c.item) },
                        e
                      )
                    )
                  )
                )
              : null,
          g = () =>
            u
              ? o.createElement(
                  o.Fragment,
                  null,
                  o.createElement(
                    "span",
                    { className: (0, a.cs)(c.text, c.textBold) },
                    u.bolded
                  ),
                  o.createElement("span", null, " "),
                  o.createElement("span", { className: c.text }, u.normal)
                )
              : null,
          E = () => {
            e.closeBusinessPopup(), e.remove();
          };
        return o.createElement(
          "div",
          { className: _ },
          o.createElement("div", {
            className: (0, a.cs)(c.swoosh, n && c.isFlipped),
          }),
          o.createElement(
            "div",
            { className: c.title },
            "Grammarly for your team"
          ),
          o.createElement(
            () =>
              r === s.L.bulletedList
                ? o.createElement(d, null)
                : o.createElement(g, null),
            null
          ),
          o.createElement(
            l.M,
            {
              clickHandler: () => {
                e.onBusinessUphookPopupFollowCta(t, r);
              },
            },
            o.createElement(
              "button",
              { className: c.blueCtaButton },
              "Explore Grammarly Business"
            )
          ),
          o.createElement(
            l.M,
            { clickHandler: E },
            o.createElement(
              "button",
              { className: (0, a.cs)(c.secondary) },
              p ? "Don't show this again" : "Dismiss"
            )
          ),
          o.createElement(
            l.M,
            { clickHandler: E },
            o.createElement("button", { className: c.close })
          ),
          o.createElement(
            "div",
            { className: (0, a.cs)(c.popupFooter, n && c.isFlipped) },
            "▲"
          )
        );
      };
    },
    19232: (e) => {
      e.exports = {
        gButtonPopup: "_1lTE2",
        newDataControl: "_1gsZQ",
        showWrapper: "_2ei_O",
        flipped: "_3uYTr",
        title: "gainz",
        icon: "Pivkw",
        button: "xY0X9",
        buttonText: "_2U8eo",
        popupFooter: "_14I1c",
        isFlipped: "_2AdW6",
        settings: "_2vyty",
        loginSSOPopup: "_3T7fk",
        text: "_2gHfL",
        bold: "_3Aiys",
        link: "_3Egqd",
        secondary: "_3Ax2F",
        firstTime: "_1iibO",
        close: "_4EKnF",
        disable: "_1i4Lv",
        gdocs: "_2HXiW",
        gdocsBeta: "_1gpKJ",
        header: "_39sF8",
        headerUnavailable: "MioHQ",
        cardsIcon: "_1X1gn",
        bubbleArrow: "_2h7sR",
        unavailablePopup: "_2bpEL",
        loginReminder: "_2SiRG",
        permission: "_1Y1Cu",
        buttonsContainer: "KEBHL",
        mainButton: "_3NHQV",
        secondaryButton: "_3gyhh",
        onboarding: "_3X1pb",
        chipmunkGButtonCalloutPopup: "B67S_",
        closeWrapper: "_1Qabb",
        containerContents: "_3Ikwa",
        container: "_14jSm",
        containerHeaderDefault: "_5E2jL",
        containerKeyboardQRCodeImageBlock: "_3wdjr",
        qrcode: "WmUis",
        containerBrandToneImageBlock: "_1RREM",
        img: "_3q1pN",
        containerSnippetImageBlock: "_23gUD",
        containerLlamaAdoptionImageBlock: "_2vZPG",
        containerOwnerActivationImageBlock: "_2diUC",
        containerGraduationImageBlock: "_2cCMu",
        containerHeaderImageBlock: "_1p-Ww",
        containerTitle: "_3G6QU",
        containerText: "cGMlR",
        containerButton: "_3BSo7",
        dismiss: "_235ws",
        warningPopup: "_1cce2",
        btn: "_2-37m",
        warning: "_1M-B9",
        ctaBtnGroup: "_3E2Dj",
        ctaButton: "_1Z4N2",
        later: "_2ECwI",
        managedSSOControl: "_3NJaO",
        illustration: "_1nEBr",
        signInWithSSO: "_1fEnz",
        signInWithSSO2: "_1SV_T",
        headerGraphic: "_3iPE7",
        businessUphookPopup: "bWMuL",
        swoosh: "_2oV7q",
        blueCtaButton: "_1hLI1",
        listTitle: "_2vuCQ",
        bulletedList: "FFlg5",
        item: "_2RFIZ",
        textBold: "_1q9M_",
        subtitle: "_1fMNf",
      };
    },
  },
]);
