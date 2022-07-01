(self.webpackChunk = self.webpackChunk || []).push([
  [4104],
  {
    35706: (e, t, s) => {
      s.r(t),
        s.d(t, { BulkAcceptFeature: () => A, BulkAcceptUIController: () => z });
      var i,
        l = s(22764),
        n = s(40327),
        r = s(41398),
        c = s(90361),
        a = s(23830),
        o = s(32281),
        u = s(44071),
        p = s(95572),
        d = s(36991),
        m = s(84966),
        h = s(73975);
      !(function (e) {
        let t, s;
        !(function (e) {
          (e.Retain = "retain"), (e.Delete = "delete"), (e.Insert = "insert");
        })((t = e.Type || (e.Type = {}))),
          (e.isDelete = function (t) {
            return t.type === e.Type.Delete;
          }),
          (e.isInsert = function (t) {
            return t.type === e.Type.Insert;
          }),
          (function (e) {
            e.eq = h.MW({ type: h.yv, textChunk: h.yv });
          })((s = e.NoInvert || (e.NoInvert = {})));
      })(i || (i = {}));
      var _ = s(5114),
        k = o.S.isCapiAlert,
        b = o.S.isSuperCapiAlert;
      const f = (e) => `${e.transformText}>>>${JSON.stringify(e.replacements)}`,
        v = (e, t) => {
          const s = [],
            l = e.transformText,
            r = e.replacements[0];
          return (
            p.DD.isWithTransformJson(e) &&
              (0, n.pipe)(
                e.transformJSON.alternatives,
                _.fold(c.EI, (e) => {
                  const n = t
                    .getPlainText()
                    .substring(e.context[0].s, e.context[0].e);
                  let c = 0;
                  e.alternatives[0].ops.forEach((e) => {
                    switch (true) {
                      case d.s.isRetain(e) &&
                        ["optional", "important"].includes(e.type):
                        s.push({
                          type: i.Type.Retain,
                          textChunk: n.substring(c, (c += e.retain)),
                          invertedChunk: "",
                        });
                        break;
                      case d.s.isInsert(e) && ["optional"].includes(e.type):
                        s.push({
                          type: i.Type.Retain,
                          textChunk: e.insert,
                          invertedChunk: "",
                        });
                        break;
                      case d.s.isInsert(e) && ["main"].includes(e.type):
                        s.push({
                          type: i.Type.Insert,
                          textChunk: r,
                          invertedChunk: l,
                        });
                        break;
                      case d.s.isDelete(e) && ["main"].includes(e.type):
                        (c += e.delete),
                          s.push({
                            type: i.Type.Delete,
                            textChunk: l,
                            invertedChunk: r,
                          });
                    }
                  });
                })
              ),
            s
          );
        };
      class g {
        constructor(e, t, s, i) {
          (this._alertProcessor = e),
            (this._textObserver = t),
            (this._replacementService = s),
            (this._checkingService = i),
            (this._alertsInBulk = new Map()),
            (this._dismissed = new Map()),
            (this._subs = []),
            (this._revision = ""),
            this._subs.push(
              this._alertProcessor.alerts.changes.subscribe((e) => {
                this._dismissed.size &&
                  e.addedAlerts.forEach((e) => {
                    [...this._dismissed.entries()].some(
                      ([t, s]) =>
                        !(!k(e) || b(e) || f(e) !== s) &&
                        (this._checkingService &&
                          this._checkingService.onAlertIgnored(e, m.e3.Inline),
                        this._alertProcessor.removeAlert(e.id, {
                          _tag: a.i.alertAccepted,
                        }),
                        true)
                    );
                  });
              })
            );
        }
        getAlertsInBulk() {
          return this._alertsInBulk;
        }
        async applyAlerts() {
          const e = Array.from(this._alertProcessor.alerts.getAll())
            .filter(
              (e) =>
                !(!k(e) || b(e)) &&
                "inline" === e.inline &&
                e.replacements.length
            )
            .sort((e, t) =>
              e.transformRange.start > t.transformRange.start ? 1 : -1
            );
          if (!e.length) return false;
          const t = this._textObserver.getCurrentTextMap().getPlainText();
          let s = 0;
          const i = [];
          e.forEach((e, l) => {
            var n;
            this._revision = e.revision;
            const r = null !== (n = e.replacements[0]) && void 0 !== n ? n : "",
              a = t.substring(e.transformRange.start, e.transformRange.end),
              p = {
                start: e.transformRange.start + s,
                end: e.transformRange.start + r.length + s,
              };
            this._alertsInBulk.set(e.id, {
              diff: v(e, this._textObserver.getCurrentTextMap()),
              isUndone: false,
              undoReplacement: { pos: p, value: a },
              alertHash: f(e),
            });
            const d = c.iy.create().slice(0, 6);
            i.push({
              _tag: o.b.bulkAccept,
              id: `${d}-${l}`,
              state: u.K.applied,
              highlightRanges: [p],
              highlightTexts: [r],
              transformText: r,
              transformRange: p,
              transforms: e.transforms,
              revision: this._revision,
              replacement: a,
              context: "",
            }),
              (s += r.length - a.length);
          });
          const l = e.slice(0).reverse();
          return (
            await this._replacementService.performBatchReplacements(
              l.map((e) => ({
                pos: e.transformRange,
                value: e.replacements[0],
              }))
            ),
            i.forEach((e) => this._alertProcessor.addAlert(e)),
            true
          );
        }
        undoReplacement(e) {
          let t = null;
          this._alertsInBulk.forEach((s, i) => {
            null !== t
              ? this._alertsInBulk.set(i, {
                  ...s,
                  undoReplacement: {
                    ...s.undoReplacement,
                    pos: {
                      start: s.undoReplacement.pos.start + t,
                      end: s.undoReplacement.pos.end + t,
                    },
                  },
                })
              : e === i &&
                (this._dismissed.set(i, s.alertHash),
                (t =
                  s.undoReplacement.value.length -
                  (s.undoReplacement.pos.end - s.undoReplacement.pos.start)),
                this._alertsInBulk.set(i, { ...s, isUndone: true }),
                this._replacementService.performReplacement(
                  s.undoReplacement.pos,
                  s.undoReplacement.value,
                  false
                ));
          });
        }
        undoAll() {
          [...this._alertsInBulk.values()].reverse().forEach((e) => {
            e.isUndone ||
              this._replacementService.performReplacement(
                e.undoReplacement.pos,
                e.undoReplacement.value,
                false
              );
          });
        }
        clear() {
          this._alertsInBulk.clear();
        }
        dispose() {
          this._subs.forEach((e) => e.unsubscribe());
        }
      }
      class A {
        constructor(e, t, s, i, n, c, a, o, u, p, d) {
          (this._textObserver = e),
            (this._replacementService = t),
            (this._checkingService = s),
            (this._controller = i),
            (this._keyDown = n),
            (this._gnar = c),
            (this._state = a),
            (this._isCurrentFieldFocused = o),
            (this._alertProcessor = u),
            (this._setBulkAcceptSimplifiedConfirmation = p),
            (this._updateBulkAcceptShortcutUsageCounter = d),
            (this._subs = []),
            (this._bulkReplacement = new g(
              this._alertProcessor,
              this._textObserver,
              this._replacementService,
              this._checkingService
            )),
            this._subs.push(
              this._keyDown
                .pipe((0, r.M)(this._isCurrentFieldFocused))
                .subscribe(async ([e, t]) => {
                  var s, i, n, r;
                  const c = (0, l.O)();
                  switch (true) {
                    case t &&
                      ((e) =>
                        "KeyG" === e.code &&
                        (c.config.systemInfo.os.isMac ? e.ctrlKey : e.altKey))(
                        e
                      ):
                      if (await this._bulkReplacement.applyAlerts()) {
                        const e =
                          null !==
                            (i =
                              null === (s = this._state.get()) || void 0 === s
                                ? void 0
                                : s.page.bulkAcceptShortcutUsageCounter) &&
                          void 0 !== i
                            ? i
                            : 0;
                        -1 !== e &&
                          this._updateBulkAcceptShortcutUsageCounter(e + 1);
                        const t =
                          null !==
                            (r =
                              null === (n = this._state.get()) || void 0 === n
                                ? void 0
                                : n.page.bulkAcceptSimplifiedConfirmation) &&
                          void 0 !== r &&
                          r;
                        this._controller.show({
                          isSimplifiedConfirmation: t,
                          isFullViewForced: false,
                          alertsInBulk: this._bulkReplacement.getAlertsInBulk(),
                          undoReplacement: (e) => {
                            this._bulkReplacement.undoReplacement(e),
                              this._gnar.bulkAcceptCorrectionUndo();
                          },
                          undoAll: () => {
                            this._bulkReplacement.undoAll(),
                              this._gnar.bulkAcceptAllCorrectionsUndo(),
                              this._close();
                          },
                          close: () => {
                            this._close();
                          },
                          setBulkAcceptSimplifiedConfirmation: (e) => {
                            this._setBulkAcceptSimplifiedConfirmation(e);
                          },
                        }),
                          this._gnar.bulkAcceptShortcutUsed();
                      }
                      break;
                    case t &&
                      ((e) =>
                        "KeyZ" === e.code &&
                        (c.config.systemInfo.os.isMac ? e.metaKey : e.ctrlKey))(
                        e
                      ) &&
                      Boolean(this._bulkReplacement.getAlertsInBulk().size):
                      e.preventDefault(),
                        this._bulkReplacement.undoAll(),
                        this._close();
                  }
                }),
              this._isCurrentFieldFocused.subscribe((e) => {
                e || this._close();
              })
            );
        }
        _close() {
          this._controller.hide(), this._bulkReplacement.clear();
        }
        dispose() {
          this._subs.forEach((e) => e.unsubscribe()),
            this._bulkReplacement.dispose();
        }
      }
      var C = s(27378),
        x = s(32952),
        y = s(93508),
        E = s(28043),
        w = s(77176),
        R = s(36346),
        S = s(12187),
        B = s(8125),
        I = s(71249),
        N = s(14444),
        M = s(2361),
        T = s(50924),
        F = s(44060),
        D = s(89894);
      const U = D.ux.style({
          display: "flex",
          flexGrow: 2,
          lineHeight: D.ux.rem(1.315),
          flexWrap: "wrap",
        }),
        W = { padding: 0, whiteSpace: "pre-wrap" },
        O = D.ux.style(W),
        V = D.ux.style(Object.assign({ color: F.Il.CoreGreen60 }, W)),
        H = D.ux.style(Object.assign({ color: F.Il.CoreBlue50 }, W)),
        P = D.ux.style(
          Object.assign(Object.assign({}, W), {
            color: F.Il.CoreRed50,
            textDecoration: "line-through",
            $nest: {
              [`& + .${V}`]: { marginLeft: D.ux.rem(0.25) },
              [`& + .${H}`]: { marginLeft: D.ux.rem(0.25) },
            },
          })
        ),
        L = D.ux.style({
          fontWeight: "bolder",
          textDecoration: "none",
          paddingLeft: "1px",
          paddingRight: "1px",
          $nest: {
            [`&.${V}`]: { backgroundColor: F.Il.CoreGreen10 },
            [`&.${P}`]: { backgroundColor: F.Il.CoreRed10 },
          },
        }),
        j = (e) =>
          C.createElement(
            "div",
            { className: U },
            (0, n.pipe)(
              e.diff,
              I.Su((t, s) =>
                (0, B.or)(i.isDelete(s), i.isInsert(s))
                  ? C.createElement(
                      "div",
                      Object.assign(
                        { key: t },
                        (0, S.Sh)(
                          i.isDelete(s) ? P : Boolean(e.a11yContrast) ? H : V,
                          (0, B.or)(
                            (0, T.BE)(s.textChunk),
                            (0, T.FD)(s.textChunk)
                          ) && L
                        )
                      ),
                      C.createElement(N.sR, {
                        newText: s.textChunk,
                        oldText: s.invertedChunk,
                        theme: Boolean(e.a11yContrast) ? M.q : M.a,
                      })
                    )
                  : C.createElement(
                      "div",
                      { key: t, className: O },
                      s.textChunk
                    )
              )
            )
          ),
        $ = () =>
          C.createElement(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            C.createElement("path", {
              d: "M1 3.5H3M15 3.5H13M13 3.5L12.1528 13.6661C12.0664 14.7027 11.1999 15.5 10.1597 15.5H5.84027C4.80009 15.5 3.93356 14.7027 3.84717 13.6661L3 3.5M13 3.5H10.5M3 3.5H5.5M5.5 3.5V2C5.5 1.17157 6.17157 0.5 7 0.5H9C9.82843 0.5 10.5 1.17157 10.5 2V3.5M5.5 3.5H10.5M9.5 6.5V12M6.5 6.5V12",
              stroke: "#6D758D",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            })
          ),
        G = () =>
          C.createElement(
            "svg",
            { width: "16", viewBox: "0 0 24 24" },
            C.createElement(
              "g",
              { fill: "none", fillRule: "evenodd", stroke: "none" },
              C.createElement("circle", {
                cx: "12",
                cy: "12",
                r: "11.5",
                fill: "#00CDA3",
              }),
              C.createElement("path", {
                stroke: "#FFF",
                strokeWidth: "2",
                d: "M7.54 12.81l3.343 3.5 6.657-7.78",
                strokeLinecap: "round",
              })
            )
          ),
        K = ({
          isSimplifiedConfirmation: e,
          alertsInBulk: t,
          undoReplacement: s,
          undoAll: i,
          close: l,
          setBulkAcceptSimplifiedConfirmation: n,
        }) => {
          const [r, c] = C.useState({}),
            [a, o] = C.useState(e);
          return C.createElement(
            "div",
            {
              "data-grammarly-part": "bulk-accept-confirmation",
              className: R.bulkAccept,
            },
            C.createElement(
              "div",
              { className: R.bulkAccept_title },
              C.createElement("div", {
                className: R.bulkAccept_title_sparkles,
              }),
              C.createElement(
                "div",
                { className: R.bulkAccept_title_text },
                "You've made ",
                t.size - Object.keys(r).length,
                " instant corrections"
              )
            ),
            C.createElement(
              "div",
              { className: R.bulkAccept_list },
              [...t.entries()]
                .filter(([e]) => !r[e])
                .map(([e, t]) =>
                  C.createElement(
                    "div",
                    { className: R.bulkAccept_list_row, key: e },
                    C.createElement(
                      "div",
                      { className: R.bulkAccept_list_row_checkbox },
                      C.createElement(G, null)
                    ),
                    C.createElement(
                      "div",
                      { className: R.bulkAccept_list_row_suggestion },
                      C.createElement(j, { diff: t.diff })
                    ),
                    C.createElement(
                      "div",
                      {
                        className: R.bulkAccept_list_row_undo,
                        onClick: (t) => {
                          s(e), c({ ...r, [e]: true });
                        },
                      },
                      C.createElement($, null)
                    )
                  )
                )
            ),
            C.createElement(
              "div",
              { className: R.bulkAccept_btnWrapper },
              C.createElement(
                "div",
                {
                  "data-grammarly-part": "ok-button",
                  className: R.bulkAccept_btnWrapper_confirm,
                  onClick: (e) => l(),
                },
                "Looks good"
              ),
              C.createElement(
                "div",
                {
                  "data-grammarly-part": "undo-button",
                  className: R.bulkAccept_btnWrapper_undo,
                  onClick: (e) => i(),
                },
                C.createElement(
                  "div",
                  { className: R.bulkAccept_btnWrapper_undo_text },
                  "Undo all"
                ),
                C.createElement(
                  "div",
                  { className: R.bulkAccept_btnWrapper_undo_key },
                  "⌘ Z"
                )
              )
            ),
            C.createElement(
              "div",
              { className: R.bulkAccept_confirmation },
              C.createElement(
                "div",
                null,
                C.createElement("input", {
                  type: "checkbox",
                  defaultChecked: a,
                  onChange: (e) => {
                    o(e.currentTarget.checked), n(e.currentTarget.checked);
                  },
                })
              ),
              C.createElement(
                "div",
                null,
                "Next time, don’t ask for confirmation."
              )
            )
          );
        },
        q = ({ alertsInBulk: e, undoAll: t, forceFullView: s }) =>
          C.createElement(
            "div",
            { className: R.bulkAcceptSimplified },
            C.createElement(
              "div",
              { className: R.bulkAcceptSimplified_text },
              "You’ve accepted",
              " ",
              C.createElement(
                "span",
                {
                  className: R.bulkAcceptSimplified_text_counter,
                  onClick: (e) => {
                    s();
                  },
                },
                e.size,
                " suggestions."
              )
            ),
            C.createElement(
              "div",
              {
                className: R.bulkAcceptSimplified_shortcut,
                onClick: (e) => t(),
              },
              C.createElement(
                "div",
                { className: R.bulkAcceptSimplified_shortcut_text },
                "Undo"
              ),
              C.createElement(
                "div",
                { className: R.bulkAcceptSimplified_shortcut_key },
                "⌘ Z"
              )
            )
          );
      var Z = s(38983);
      class z {
        constructor() {
          (this._hovered = new x.xQ()),
            (this._dismissed = new x.xQ()),
            (this.cardHovered = this._hovered.pipe(
              (0, y.O)(false),
              (0, E.x)()
            )),
            (this.cardDismissed = this._dismissed.pipe((0, E.x)())),
            (this._activeCardModel = Z.h.create(null)),
            (this.view = this._activeCardModel.pipe(
              (0, w.U)((e) => (e ? C.createElement(K, { ...e }) : null))
            )),
            (this.getView = (e) =>
              this._activeCardModel.pipe(
                (0, w.U)((t) => {
                  switch ((clearTimeout(this._autocloseTimeout), true)) {
                    case "full" === e &&
                      t &&
                      (!t.isSimplifiedConfirmation || t.isFullViewForced):
                      return C.createElement(K, { ...t });
                    case "simplified" === e &&
                      t &&
                      t.isSimplifiedConfirmation &&
                      !t.isFullViewForced:
                      return (
                        (this._autocloseTimeout = setTimeout(
                          this._dismiss.bind(this),
                          4e3
                        )),
                        C.createElement(q, {
                          ...t,
                          forceFullView: () => this._forceFullView(),
                        })
                      );
                    default:
                      return null;
                  }
                })
              ));
        }
        _dismiss() {
          this._activeCardModel.set(null);
        }
        _forceFullView() {
          const e = this._activeCardModel.get();
          this._activeCardModel.set({ ...e, isFullViewForced: true });
        }
        show(e) {
          this._activeCardModel.set(e);
        }
        hide() {
          this._activeCardModel.set(null), this._hovered.next(false);
        }
        isVisible() {
          return !!this._activeCardModel.get();
        }
        dispose() {
          this.hide();
        }
      }
    },
    5498: (e, t, s) => {
      s.r(t), s.d(t, { BulkAcceptUndoCard: () => o });
      var i = s(27378),
        l = s(46547),
        n = s(88326),
        r = s(12187),
        c = s(5739),
        a = s(13600);
      const o = (e) => {
        const t = () =>
          i.createElement(
            "div",
            { className: a.buttonRow, key: "buttons" },
            i.createElement(
              n.M,
              {
                dataGrammarlyPart: "ok-button",
                clickHandler: () => e.onAcceptClick(),
              },
              i.createElement(
                "div",
                { ...(0, r.Sh)(a.button, a.acceptButton) },
                "Looks good"
              )
            ),
            i.createElement(
              n.M,
              {
                dataGrammarlyPart: "revert-button",
                clickHandler: () => e.onRejectClick(),
              },
              i.createElement(
                "div",
                { ...(0, r.Sh)(a.button, a.rejectButton) },
                "Revert to ",
                i.createElement(
                  "span",
                  { className: a.originalText },
                  e.originalText || '""'
                )
              )
            )
          );
        return i.createElement(
          l.Z,
          { kind: "inline-fit-content" },
          i.createElement(
            "div",
            { className: a.bulkAcceptCard },
            i.createElement(
              () =>
                i.createElement(
                  c.F.Fragment,
                  null,
                  i.createElement(
                    "div",
                    { className: a.footerCaption },
                    i.createElement("div", {
                      className: a.footerCaption_sparkles,
                    }),
                    i.createElement(
                      "div",
                      { className: a.footerCaption_text },
                      "Instantly corrected"
                    )
                  ),
                  i.createElement(t, null)
                ),
              null
            )
          )
        );
      };
    },
    13600: (e) => {
      e.exports = {
        bulkAcceptCard: "_2u8Lc",
        footerCaption: "_21Z_d",
        footerCaption_sparkles: "dlslv",
        footerCaption_text: "_1Ue2H",
        buttonRow: "_1GPsh",
        button: "_3pBBY",
        acceptButton: "owvts",
        rejectButton: "WibOy",
        originalText: "_27CUg",
        listItem: "_2UVpv",
        buttonWrap: "_1Y8Pc",
        icon: "_3k3hh",
        caption: "Myuhr",
      };
    },
    36346: (e) => {
      e.exports = {
        bulkAccept: "_3aIJb",
        bulkAccept_title: "d_Hup",
        bulkAccept_title_sparkles: "_30ax7",
        bulkAccept_title_text: "_Ex0B",
        bulkAccept_list: "_1EKCC",
        bulkAccept_list_row: "_1qiqt",
        bulkAccept_list_row_checkbox: "_3dcFO",
        bulkAccept_list_row_suggestion: "ThM-s",
        bulkAccept_list_row_undo: "_302di",
        bulkAccept_btnWrapper: "_10DDN",
        bulkAccept_btnWrapper_confirm: "_1GS3W",
        bulkAccept_btnWrapper_undo: "_2l-R3",
        bulkAccept_btnWrapper_undo_text: "_1As23",
        bulkAccept_btnWrapper_undo_key: "_3TlLp",
        bulkAccept_confirmation: "_1Diqs",
        bulkAcceptSimplified: "_2mAxL",
        bulkAcceptSimplified_text: "_2xBcy",
        bulkAcceptSimplified_text_counter: "_2PgcU",
        bulkAcceptSimplified_shortcut: "_2eVmT",
        bulkAcceptSimplified_shortcut_text: "b1rSn",
        bulkAcceptSimplified_shortcut_key: "_2wtU8",
      };
    },
  },
]);
