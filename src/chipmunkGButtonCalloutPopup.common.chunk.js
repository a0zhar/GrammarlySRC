(self.webpackChunk = self.webpackChunk || []).push([
  [1778],
  {
    20882: (e, t, n) => {
      n.r(t), n.d(t, { ChipmunkGButtonCalloutPopup: () => d });
      var a = n(61658),
        i = n(5872),
        o = n(27378),
        s = n(1620),
        r = n(36504),
        l = n(19106);
      class c extends o.Component {
        constructor() {
          super(...arguments),
            (this.state = {
              acknowledgementDone: false,
              isAcknowledging: false,
            });
        }
        async componentDidMount() {
          !this.state ||
            this.state.isAcknowledging ||
            this.state.acknowledgementDone ||
            (this.setState({ isAcknowledging: true }),
            this.acknowledgeMessage(),
            this.setState({ acknowledgementDone: true }));
        }
        acknowledgeMessage() {
          this.props.acknowledge(this.messageId, this.props.docId),
            l.J.chipmunkMessageDisplayed(this.campaignName, this.messageId);
        }
        onSoftDismiss() {
          this.props.softDismiss(),
            l.J.chipmunkMessageSoftDismissed(this.campaignName, this.messageId);
        }
        onHardDismiss() {
          this.props.hardDismiss(this.messageId),
            l.J.chipmunkMessageHardDismissed(this.campaignName, this.messageId);
        }
        onCTAClick() {
          l.J.chipmunkMessageCTAClick(this.campaignName, this.messageId);
        }
        get message() {
          return this.props.messageRecord.message;
        }
        get messageId() {
          return this.props.messageRecord.messageId;
        }
        get campaignName() {
          return this.props.messageRecord.campaignName;
        }
      }
      var m = n(88326);
      class d extends c {
        constructor() {
          super(...arguments),
            (this._getContainerHeader = (e) => {
              var t;
              switch (
                null === (t = e.arguments) || void 0 === t
                  ? void 0
                  : t.headerType
              ) {
                case r.n0.Default:
                  return o.createElement("div", {
                    className: `${a.containerHeaderDefault} ${a.container}`,
                  });
                case r.n0.ImageBlock:
                  return this._getContainerImageBlock(e);
                default:
                  return null;
              }
            }),
            (this._getContainerImageBlock = (e) => {
              var t;
              const n =
                null === (t = e.arguments) || void 0 === t
                  ? void 0
                  : t.imageUrl;
              if (void 0 === n) return null;
              const s = "keyboard-qrcode.png" === n,
                r = "brand-tone-ipm-header.png" === n,
                l = "snippet-ipm-header.gif" === n,
                c = "llama-adoption.png" === n,
                m = "owner-activation-ipm-header.gif" === n,
                d = "graduation-campaign-ipm.svg" === n,
                g = s || r || l || c || m || d;
              return o.createElement(
                "div",
                {
                  className: (0, i.cs)(a.container, {
                    [a.containerKeyboardQRCodeImageBlock]: s,
                    [a.containerBrandToneImageBlock]: r,
                    [a.containerSnippetImageBlock]: l,
                    [a.containerLlamaAdoptionImageBlock]: c,
                    [a.containerOwnerActivationImageBlock]: m,
                    [a.containerGraduationImageBlock]: d,
                    [a.containerHeaderImageBlock]: !g,
                  }),
                },
                g
                  ? o.createElement("div", {
                      className: (0, i.cs)({ [a.qrcode]: s, [a.img]: !s }),
                    })
                  : o.createElement("img", { src: n })
              );
            }),
            (this._getContainerTitle = (e) => {
              var t;
              return o.createElement(
                "div",
                { className: `${a.containerTitle} ${a.container}` },
                o.createElement(
                  "h3",
                  null,
                  null === (t = e.arguments) || void 0 === t ? void 0 : t.text
                )
              );
            }),
            (this._getContainerText = (e) => {
              var t, n;
              return o.createElement(
                "div",
                { className: `${a.containerText} ${a.container}` },
                o.createElement("p", {
                  dangerouslySetInnerHTML: {
                    __html:
                      null !==
                        (n =
                          null === (t = e.arguments) || void 0 === t
                            ? void 0
                            : t.text) && void 0 !== n
                        ? n
                        : "",
                  },
                })
              );
            });
        }
        render() {
          var e, t, n, l;
          const c = this.message,
            m = this.message.containerContent[0],
            d =
              (null == m ? void 0 : m.containerType) === r.lS.Header &&
              (null === (e = null == m ? void 0 : m.arguments) || void 0 === e
                ? void 0
                : e.headerType) === r.n0.ImageBlock,
            g = [
              "snippet-ipm-header.gif",
              "llama-adoption.png",
              "owner-activation-ipm-header.gif",
            ].includes(
              null !==
                (n =
                  null === (t = null == m ? void 0 : m.arguments) ||
                  void 0 === t
                    ? void 0
                    : t.imageUrl) && void 0 !== n
                ? n
                : ""
            ),
            u =
              d &&
              (g ||
                "light-x-button" ===
                  (null === (l = null == m ? void 0 : m.arguments) ||
                  void 0 === l
                    ? void 0
                    : l.exitButton));
          return o.createElement(
            "div",
            {
              className: (0, i.cs)(
                a.gButtonPopup,
                a.gdocsBeta,
                a.chipmunkGButtonCalloutPopup
              ),
            },
            o.createElement(
              "div",
              { className: a.closeWrapper },
              o.createElement(s.P, {
                onClick: () => this.onSoftDismiss(),
                color: u ? "white" : "dark",
              })
            ),
            o.createElement(
              "div",
              { className: a.containerContents },
              c.containerContent.map((e, t) =>
                o.createElement(o.Fragment, { key: t }, this._getContainer(e))
              )
            )
          );
        }
        _getContainer(e) {
          switch (null == e ? void 0 : e.containerType) {
            case r.lS.Header:
              return this._getContainerHeader(e);
            case r.lS.Title:
              return this._getContainerTitle(e);
            case r.lS.Text:
              return this._getContainerText(e);
            case r.lS.Buttons:
              return this._getContainerButton(e);
            default:
              return null;
          }
        }
        _getContainerButton(e) {
          var t, n;
          return o.createElement(
            "div",
            { className: `${a.containerButton} ${a.container}` },
            null ===
              (n =
                null === (t = e.arguments) || void 0 === t
                  ? void 0
                  : t.buttons) || void 0 === n
              ? void 0
              : n.map((e, t) =>
                  o.createElement(o.Fragment, { key: t }, this._getButton(e))
                )
          );
        }
        _getButton(e) {
          switch (e.buttonType) {
            case r.nt.Link:
              return o.createElement(
                m.M,
                { clickHandler: () => this.onCTAClick() },
                o.createElement(
                  "a",
                  { href: e.linkUrl, target: "_blank", className: a.button },
                  e.text
                )
              );
            case r.nt.SoftDismiss:
              return o.createElement(
                m.M,
                { clickHandler: () => this.onSoftDismiss() },
                o.createElement("button", { className: a.dismiss }, e.text)
              );
            case r.nt.HardDismiss:
              return o.createElement(
                m.M,
                { clickHandler: () => this.onHardDismiss() },
                o.createElement("button", { className: a.dismiss }, e.text)
              );
            default:
              return null;
          }
        }
      }
    },
    61658: (e) => {
      e.exports = {
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
