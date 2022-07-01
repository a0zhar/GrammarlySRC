(self.webpackChunk = self.webpackChunk || []).push([
  [6332],
  {
    45299: (t, e, n) => {
      n.r(e), n.d(e, { AccountMigrationNotificationPopup: () => i });
      var a = n(27378),
        o = n(29187);
      const i = ({ message: t, addPaymentInfo: e, close: n }) =>
        a.createElement(o.l, {
          onClose: n,
          onCtaClick: e,
          title: "Action required: Update your subscription",
          body: t,
          ctaText: "Add Billing Information",
          dataGrammarlyPart: "btnAccountMigrationNotificationClose",
        });
    },
    29187: (t, e, n) => {
      n.d(e, { l: () => c });
      var a = n(27378),
        o = n(24606),
        i = n(12187),
        r = n(61658);
      const c = ({
        title: t,
        body: e,
        ctaText: n,
        closeText: c = "Later",
        dataGrammarlyPart: l,
        onCtaClick: s,
        onClose: _,
      }) =>
        a.createElement(
          "section",
          { ...(0, i.Sh)(r.gButtonPopup, r.warningPopup) },
          a.createElement("button", {
            ...(0, i.Sh)(r.btn, r.close),
            onClick: _,
            "data-grammarly-part": l,
          }),
          a.createElement("div", { className: r.warning }),
          a.createElement(
            "section",
            null,
            t && a.createElement("div", { className: r.title }, t),
            e && a.createElement("div", { className: r.text }, e),
            a.createElement(
              "section",
              { className: r.ctaBtnGroup },
              a.createElement(
                o.z,
                { kind: "primary", onClick: s, className: r.ctaButton },
                n
              ),
              a.createElement(
                o.z,
                { kind: "link", onClick: _, className: r.later },
                c
              )
            )
          )
        );
    },
    61658: (t) => {
      t.exports = {
        gButtonPopup: "_1kF5v",
        newDataControl: "_2DXpn",
        showWrapper: "jbUGk",
        flipped: "_33Y70",
        title: "_3j0IH",
        icon: "_3mzPB",
        button: "_3ayiu",
        buttonText: "_3iTGv",
        popupFooter: "_1Pn79",
        isFlipped: "mrPCR",
        settings: "_1wln3",
        loginSSOPopup: "_3VfKv",
        text: "_1igtd",
        bold: "_233YR",
        link: "_3Zolz",
        secondary: "_3CC0d",
        firstTime: "eytxh",
        close: "_1Q8MJ",
        disable: "_2GBXV",
        gdocs: "_1rwC7",
        gdocsBeta: "_3Nt7c",
        header: "_2QN8E",
        headerUnavailable: "_3oKby",
        cardsIcon: "_2p0cU",
        bubbleArrow: "_3P-V4",
        unavailablePopup: "_3ItKT",
        loginReminder: "_3nwkh",
        permission: "_3t67i",
        buttonsContainer: "_1o9Lo",
        mainButton: "_2Ltwz",
        secondaryButton: "_1gDFt",
        onboarding: "_36Myk",
        chipmunkGButtonCalloutPopup: "_1BqSc",
        closeWrapper: "_1iSkp",
        containerContents: "_3-RfQ",
        container: "_3DqWc",
        containerHeaderDefault: "tSLDM",
        containerKeyboardQRCodeImageBlock: "_35_s3",
        qrcode: "_25Ol6",
        containerBrandToneImageBlock: "_26_GC",
        img: "_38WyO",
        containerSnippetImageBlock: "g-PwS",
        containerLlamaAdoptionImageBlock: "_2rwye",
        containerOwnerActivationImageBlock: "AUmvb",
        containerGraduationImageBlock: "_2k9Eq",
        containerHeaderImageBlock: "_2u4gj",
        containerTitle: "_3SP28",
        containerText: "w2FY9",
        containerButton: "_3p4LT",
        dismiss: "_1CkBd",
        warningPopup: "dcXJa",
        btn: "_36yMW",
        warning: "_3IVIe",
        ctaBtnGroup: "_1Bbg8",
        ctaButton: "_1mTiW",
        later: "_22eWb",
        managedSSOControl: "nF7Y6",
        illustration: "ThWjl",
        signInWithSSO: "_3cCtR",
        signInWithSSO2: "_2Z9Lo",
      };
    },
  },
]);
