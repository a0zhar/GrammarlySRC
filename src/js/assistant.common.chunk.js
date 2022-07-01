(self.webpackChunk = self.webpackChunk || []).push([
  [8721],
  {
    51897: (e, t, i) => {
      var a = i(25682),
        s = "chrome-extension://__MSG_@@extension_id__/",
        r = "moz-extension://__MSG_@@extension_id__/",
        n = "safari-web-extension://__MSG_@@extension_id__/",
        o = self.GR_RESOURCE_ROOT || s,
        l = self.GR_RESOURCE_ROOT || r,
        c = self.GR_RESOURCE_ROOT || n;
      e.exports = {
        __css: a
          .toString()
          .replace(new RegExp(s, "g"), o)
          .replace(new RegExp(r, "g"), l)
          .replace(new RegExp(n, "g"), c),
        ...a.locals,
      };
    },
    16037: (e, t, i) => {
      i.d(t, { t: () => D });
      var a = i(57050),
        s = i(40273),
        r = i(90361),
        n = i(36991);
      var o = i(34311),
        l = i(62337),
        c = i(95384),
        d = i(63919),
        u = i(30067),
        p = i(74850),
        m = i(32952),
        h = i(85985),
        g = i(77176),
        v = i(93508);
      class f {
        constructor() {
          (this._mapByHighlightId = new Map()),
            (this._mapByAlertId = new Map()),
            (this._highlightDataChanged = new m.xQ()),
            (this.highlightDataChanged = this._highlightDataChanged);
        }
        getByHighlightId(e) {
          return this._mapByHighlightId.get(e);
        }
        getByAlertId(e) {
          const t = this._mapByAlertId.get(e) || new Set();
          return Array.from(t)
            .map((e) => this._mapByHighlightId.get(e))
            .filter((e) => !!e);
        }
        get(e) {
          return this._mapByHighlightId.get(e);
        }
        has(e) {
          return this._mapByHighlightId.has(e);
        }
        set(e, t) {
          this._mapByHighlightId.set(e, t);
          const i = this._mapByAlertId.get(t.alertId) || new Set();
          i.add(e),
            this._mapByAlertId.set(t.alertId, i),
            this._highlightDataChanged.next(e);
        }
        delete(e) {
          const t = this._mapByHighlightId.get(e);
          if (t) {
            const i = this._mapByAlertId.get(t.alertId);
            void 0 !== i &&
              (i.delete(e),
              0 === i.size && this._mapByAlertId.delete(t.alertId)),
              this._mapByHighlightId.delete(e);
          }
          this._highlightDataChanged.next(e);
        }
        forEach(e) {
          this._mapByHighlightId.forEach(e);
        }
        getHighlightDataObs(e) {
          return this._highlightDataChanged.pipe(
            h.h((t) => t === e),
            g.U(() => this.getByHighlightId(e)),
            v.O(this.getByHighlightId(e))
          );
        }
      }
      class w {
        constructor(e, t, i, a, s = () => d.E9.zero, r = p.Y.create(w.name)) {
          (this._denaliHighlights = e),
            (this._getFluidHighlights = t),
            (this._getTextMap = i),
            (this._getParentRect = a),
            (this._getParentScroll = s),
            (this._log = r);
        }
        register(e, t, i, a) {
          if (null !== e) {
            if (this._denaliHighlights.has(e)) return this.update(e, t, i, a);
            {
              const s = new c.Fd(
                  e,
                  t,
                  this._getFluidHighlights(),
                  this._getParentRect,
                  this._getParentScroll
                ),
                r = { id: e, alertId: a.alertId, mark: s, visualization: i };
              this._denaliHighlights.set(e, r);
              const n = this._getTextMap().getPlainText();
              return (
                this._getFluidHighlights().addHighlight(
                  e,
                  (0, u.rX)((0, u.mp)(s.range), n),
                  a
                ),
                r
              );
            }
          }
          return null;
        }
        remove(e) {
          this._denaliHighlights.has(e)
            ? (this._getFluidHighlights().removeHighlights([e]),
              this._denaliHighlights.delete(e))
            : this._log.warn(`can't remove mark #${e}, doesn't exist`);
        }
        update(e, t, i, a) {
          const s = this._denaliHighlights.get(e);
          if (s) {
            this._denaliHighlights.set(e, { ...s, visualization: i });
            const r = this._getTextMap().getPlainText();
            return (
              this._getFluidHighlights().updateHighlight(
                e,
                (0, u.rX)(t.meta.range(), r),
                a
              ),
              s
            );
          }
          return (
            this._log.warn("cannot update not existing highlight", e), null
          );
        }
        clearAll() {
          this._denaliHighlights.forEach((e) => {
            this._getFluidHighlights().removeHighlights([e.id]);
          });
        }
      }
      var b = i(55073),
        S = i(5817),
        y = i(25938),
        _ = i(6368),
        k = i(59443),
        A = i(24645),
        C = i(51374),
        E = i(9922),
        I = i(24209),
        M = i(40151),
        T = i(76974),
        x = i(95300),
        R = i(77150),
        L = i(80900),
        F = i(50628),
        P = i(22232),
        V = i(95574),
        B = i(5114),
        O = i(71249),
        N = i(95195);
      class D {
        constructor(e, t, i, s, r, n, d = p.Y.create(D.name), u, v) {
          (this._highlights = e),
            (this._textObserver = t),
            (this._replacementService = i),
            (this._layout = s),
            (this._scroller = r),
            (this._selectedHighlightsTracker = n),
            (this._log = d),
            (this._requestAwaitService = u),
            (this._formattingService = v),
            (this._subs = new E.w.Keeper()),
            (this._disposed = false),
            (this._highlightedAlertId = null),
            (this._marks = new Map()),
            (this._highlightsDataStore = new f()),
            (this._highlightUpdater = new w(
              this._highlightsDataStore,
              () => this._highlights,
              () => this._textObserver.getTextSource(),
              () => {
                const e = this._layout.textField.rect.getApproximate();
                return l.Pf.create({ ...e.client, ...e.size });
              },
              () => this._layout.textField.scroll.getApproximate()
            )),
            (this.highlightHoverProvider = {
              getHoveredStateBehavior: (e) =>
                this._highlightsDataStore
                  .getHighlightDataObs(e)
                  .pipe(
                    g.U((e) =>
                      e &&
                      e.visualization.type ===
                        c.sO.Change.VisualState.Type.highlighted
                        ? {
                            [c.sO.Change.VisualState.Source.sidebar]:
                              o.pc.hovered_needs_attention,
                            [c.sO.Change.VisualState.Source.text]: o.pc.hovered,
                            [c.sO.Change.VisualState.Source.api]:
                              this._highlightedAlertId === e.alertId
                                ? o.pc.hovered
                                : o.pc.none,
                          }[e.visualization.source]
                        : o.pc.none
                    )
                  ),
            }),
            (this._updateContentsBuffer = new m.xQ()),
            (this._flushUpdater = new m.xQ()),
            (this.getContents = (e, t) => {
              if (
                (this._log.trace(`getContents, ${e}, ${t}`),
                this._formattingService)
              ) {
                const i = this._textObserver.getTextSource().getRichText();
                return y.RI.unsafeRes(
                  void 0 !== e ? i.slice(e, void 0 !== t ? e + t : void 0) : i
                );
              }
              {
                const i =
                  void 0 !== e
                    ? this.getText().slice(e, void 0 !== t ? e + t : void 0)
                    : this.getText();
                return y.RI.resFromText(i);
              }
            }),
            (this.changes = I.T(
              (0, a.zG)(
                y.RI.res(this.getContents().delta),
                N.g_(
                  () => M.E,
                  (e) => T.of(e)
                )
              ),
              this._textObserver.contentChanges.async.pipe(
                h.h((e) => e.changes.length > 0),
                g.U(({ deltaChange: e }) => e)
              )
            )),
            (this.activeMarks = new x.X(B.none)),
            (this.contentUpdated = new m.xQ()),
            (this.hoveredMarks = new x.X(B.none)),
            (this.textChangedAfterPaste = new m.xQ()),
            (this.activeWord = new x.X(B.none)),
            (this.clickedWord = new x.X(B.none)),
            (this.ongoingSelection = new x.X(false)),
            this._log.info(`${D.name} created`),
            this._subs.push(
              this._subscribeToContentUpdates(),
              this._subscribeToSelectedHighlight(),
              this._trackFocusedAlert()
            );
        }
        _trackFocusedAlert() {
          return this._highlightsDataStore.highlightDataChanged
            .pipe(
              g.U((e) => this._highlightsDataStore.getByHighlightId(e)),
              h.h((e) => !!e)
            )
            .subscribe((e) => {
              this._highlightedAlertId === e.alertId ||
              e.visualization.type !==
                c.sO.Change.VisualState.Type.highlighted ||
              (e.visualization.source !== c.sO.Change.VisualState.Source.text &&
                e.visualization.source !==
                  c.sO.Change.VisualState.Source.sidebar)
                ? e.alertId === this._highlightedAlertId &&
                  e.visualization.type ===
                    c.sO.Change.VisualState.Type.visible &&
                  ((this._highlightedAlertId = null),
                  this._log.trace(
                    `Mark ${e.id} unfocused - alertId ${e.alertId}`
                  ))
                : ((this._highlightedAlertId = e.alertId),
                  this._log.trace(
                    `Mark ${e.id} focused - alertId ${e.alertId}`
                  ));
            });
        }
        pushChanges(e, t) {
          this._log.trace("pushChanges", { change: e, source: t }),
            y.RI.isFlush(e)
              ? this._flushUpdater.next()
              : y.RI.isReset(e)
              ? this._log.warn("Got unknown reset")
              : this._updateContents(e.delta, t);
        }
        getText() {
          return (
            this._log.trace("getText"),
            this._formattingService
              ? (0, b.l)(this._textObserver.getTextSource().getRichText(), "")
              : this._textObserver.getTextSource().getPlainText()
          );
        }
        getTextLength() {
          return this._log.trace("getTextLength"), this.getText().length;
        }
        flushChanges() {
          this._log.trace("flushChanges");
        }
        getCursor() {
          return this._log.trace("getCursor"), k.Y1.empty;
        }
        setCursor(e, t, i) {
          return (
            this._log.trace("setCursor", { _index: e, _length: t, _source: i }),
            N.F2(void 0)
          );
        }
        getLastPossibleCursorPosition() {
          return this._log.trace("getLastPossibleCursorPosition"), 0;
        }
        _doMarkAction(e) {
          const t = o.y$.Id.createFromMark(e.id),
            i = e.meta.capiAlertId;
          switch (e.action) {
            case A.v.Change.ActionType.create:
              const a = this._highlightUpdater.register(
                  t,
                  e,
                  e.meta.visualState,
                  {
                    alertId: i,
                    highlightId: t,
                    highlightColor: e.meta.highlightColor,
                    highlightDisplayFormat: e.meta.highlightDisplayFormat,
                    highlightDisappearOnHoverDelay:
                      e.meta.highlightDisappearOnHoverDelay,
                  }
                ),
                s = (null == a ? void 0 : a.mark) || null;
              return s && this._marks.set(s.id, s), s;
            case A.v.Change.ActionType.update:
              const r = this._highlightUpdater.update(
                  t,
                  e,
                  e.meta.visualState,
                  {
                    alertId: i,
                    highlightId: t,
                    highlightColor: e.meta.highlightColor,
                    highlightDisplayFormat: e.meta.highlightDisplayFormat,
                    highlightDisappearOnHoverDelay:
                      e.meta.highlightDisappearOnHoverDelay,
                  }
                ),
                n = (null == r ? void 0 : r.mark) || null;
              return n && this._marks.set(n.id, n), n;
            case A.v.Change.ActionType.remove:
              return (
                this._highlightUpdater.remove(t), this._marks.delete(e.id), null
              );
            default:
              (0, P.vE)(e);
          }
        }
        changeMarks(e) {
          return this._disposed
            ? (this._log.debug(
                "changeMarks called after disposed, returning empty result"
              ),
              A.v.Change.Result.getEmpty())
            : (this._log.trace("changeMarks", { rawMarks: e }),
              e.reduce((e, t) => {
                switch (t.action) {
                  case A.v.Change.ActionType.create:
                    e.created.set(
                      t.id,
                      N.ij(new Error("Cannot create mark"))(
                        this._doMarkAction(t)
                      )
                    );
                    break;
                  case A.v.Change.ActionType.update:
                    e.updated.set(
                      t.id,
                      N.ij(new Error("Cannot update mark"))(
                        this._doMarkAction(t)
                      )
                    );
                    break;
                  case A.v.Change.ActionType.remove:
                    this._doMarkAction(t), e.removed.set(t.id, N.F2(void 0));
                }
                return e;
              }, A.v.Change.Result.getEmpty()));
        }
        scrollToMark(e, t) {
          var i;
          const a =
            null !== (i = this._marks.get(e)) && void 0 !== i ? i : null;
          return (
            this._log.trace("scrollToMark", { markId: e, mark: a, opts: t }),
            a
              ? this._scroller.scrollToMark(a, t)
              : (this._log.warn(
                  `Tried to scroll to nonexistent mark with id: ${e}`
                ),
                M.E)
          );
        }
        _subscribeToContentUpdates() {
          return this._updateContentsBuffer
            .pipe(
              R.R(() =>
                I.T(L.H((0, S.Xd)(20)), this._flushUpdater).pipe(F.P())
              ),
              h.h((e) => e.length > 0),
              g.U((e) => e.reduce((e, t) => e.compose(t), new _.i()))
            )
            .subscribe((e) => {
              const t = this._replacementService
                .performBatchReplacements(
                  ((i = e),
                  i
                    .reduce(
                      ({ actions: e, index: t }, i) => {
                        const a = e[0];
                        return n.s.isInsertString(i)
                          ? (e.unshift({
                              pos: { start: t, end: t },
                              value: i.insert,
                            }),
                            { actions: e, index: t })
                          : n.s.isInsertEmbed(i)
                          ? { actions: e, index: t + 1 }
                          : n.s.isRetain(i)
                          ? { actions: e, index: t + i.retain }
                          : n.s.isDelete(i)
                          ? (a && a.pos.start === a.pos.end && a.pos.end === t
                              ? (a.pos = {
                                  ...a.pos,
                                  end: a.pos.end + i.delete,
                                })
                              : e.unshift({
                                  pos: { start: t, end: t + i.delete },
                                  value: "",
                                }),
                            { actions: e, index: t + i.delete })
                          : void (0, r.vE)(i);
                      },
                      { actions: [], index: 0 }
                    )
                    .actions.reduce(
                      (e, t) => (
                        e.length &&
                        e[e.length - 1].value &&
                        e[e.length - 1].pos.start === t.pos.start
                          ? (e[e.length - 1].value = `${t.value}${
                              e[e.length - 1].value
                            }`)
                          : e.push(t),
                        e
                      ),
                      []
                    ))
                )
                .then(
                  () => {
                    const t = ((e) =>
                      e.reduce(
                        ({ formattings: e, index: t }, i) =>
                          s.m.hasFormatting(i)
                            ? n.s.isInsertString(i)
                              ? (e.push({
                                  range: {
                                    start: t,
                                    end:
                                      "\n" === i.insert
                                        ? t
                                        : t + i.insert.length,
                                  },
                                  formatting: i.attributes,
                                }),
                                { formattings: e, index: t + i.insert.length })
                              : n.s.isInsertEmbed(i)
                              ? { formattings: e, index: t + 1 }
                              : n.s.isRetain(i)
                              ? (e.push({
                                  range: { start: t, end: t + i.retain },
                                  formatting: i.attributes,
                                }),
                                { formattings: e, index: t + i.retain })
                              : { formattings: e, index: t }
                            : n.s.isInsertString(i)
                            ? { formattings: e, index: t + i.insert.length }
                            : n.s.isInsertEmbed(i)
                            ? { formattings: e, index: t + 1 }
                            : n.s.isRetain(i)
                            ? { formattings: e, index: t + i.retain }
                            : n.s.isDelete(i)
                            ? { formattings: e, index: t }
                            : void (0, r.vE)(i),
                        { formattings: [], index: 0 }
                      ).formattings)(e);
                    this._formattingService &&
                      t.length &&
                      (this._log.trace("Have formattings, applying", t),
                      t.forEach((e) => {
                        this._formattingService &&
                          this._formattingService.apply(e.range, e.formatting);
                      }));
                  },
                  () => {
                    this._log.warn("Failed to apply batch replacements");
                  }
                );
              var i;
              this._requestAwaitService &&
                this._requestAwaitService.addRequest(t);
            });
        }
        _subscribeToSelectedHighlight() {
          return this._selectedHighlightsTracker
            .pipe(
              g.U(
                (0, a.ls)(
                  O.UI((e) => {
                    var t;
                    return (0, a.zG)(
                      B.fromNullable(
                        null === (t = this._highlightsDataStore.get(e)) ||
                          void 0 === t
                          ? void 0
                          : t.mark
                      ),
                      B.filter((e) =>
                        (0, a.zG)(
                          e.range(),
                          N.g_(a.W8, (0, a.ff)(C.x.isEnclosingView))
                        )
                      )
                    );
                  }),
                  O.oA
                )
              )
            )
            .subscribe((e) => this.activeMarks.next(B.some(e)));
        }
        _updateContents(e, t) {
          this._updateContentsBuffer.next((0, b.AQ)(e));
        }
        getSelectionRect() {
          throw (this._log.trace("getSelectionRect"), Error("not implemented"));
        }
        setContents(e) {
          this._log.trace("setContents", { _value: e });
        }
        getHTML() {
          return this._log.trace("getHTML"), "";
        }
        getPossibleCursorPosition(e, t) {
          return (
            this._log.trace("getPossibleCursorPosition", { _x: e, _y: t }),
            V.vM(() => {
              throw new Error("Not implemented");
            })
          );
        }
        dispose() {
          this._highlightUpdater.clearAll(),
            this._subs.dispose(),
            this._log.info(`${D.name} disposed`),
            (this._disposed = true);
        }
      }
    },
    25913: (e, t, i) => {
      i.d(t, { Y: () => p, q: () => m });
      var a = i(57050),
        s = i(41398),
        r = i(77176),
        n = i(93508),
        o = i(46861),
        l = i(40033),
        c = i(10720),
        d = i(66896),
        u = i(5114);
      const p = (e, t) => {
          const i = (0, c.ux)(
              e.lensState,
              e.cardsListScrollManager,
              e.capabilities
            ),
            a = Math.max(
              600,
              t.size.height + o.O.headerHeight + o.O.panelHeight
            );
          return i.pipe(
            (0, s.M)(e.predictionsPreviewViewModel.previewState),
            (0, r.U)(([e, t]) => {
              if (t.kind !== l.fA.visible) return e;
              const i = [t.readersAttention, t.tone].filter(u.isSome).length;
              return i > 0
                ? e +
                    o.O.predictionsPreviewHeaderHeight +
                    o.O.predictionInsightHeight * i +
                    o.O.predictionInsightBottomMargin
                : e;
            }),
            (0, n.O)(0),
            (0, r.U)((e) => Math.max(e + o.O.headerHeight, a)),
            (0, r.U)((e) => Math.min(e, 750))
          );
        },
        m = (e, t, i) => (s) => {
          const r = e(),
            n = (e) => e * i(),
            o = n(1),
            l = n(2.25);
          return (0, a.zG)(
            t(),
            u.map((e) => e - (0, c.US)(r)),
            u.map((e) => (d.R.isMainLens(r) && s ? e - l - o : e - o)),
            u.map((e) => e - n(1)),
            u.filter((e) => e > 0)
          );
        };
    },
    18126: (e, t, i) => {
      i.d(t, { f: () => o });
      var a = i(95300),
        s = i(2844),
        r = i(66310),
        n = i(34311);
      class o {
        constructor(e) {
          (this._originalHoverProvider = e),
            (this._assistantHoverProviderSbj = new a.X(null));
        }
        setAssistantHover(e) {
          this._assistantHoverProviderSbj.next(e);
        }
        removeAssistantHover() {
          this._assistantHoverProviderSbj.next(null);
        }
        getHoveredStateBehavior(e) {
          const t = this._originalHoverProvider.getHoveredStateBehavior(e);
          return this._assistantHoverProviderSbj.pipe(
            (0, r.w)((i) =>
              null == i
                ? t
                : (0, s.aj)(t, i.getHoveredStateBehavior(e), (e, t) =>
                    t !== n.pc.none ? t : e
                  )
            )
          );
        }
      }
    },
    8467: (e, t, i) => {
      i.d(t, { t: () => c });
      var a = i(40327),
        s = i(30067),
        r = i(95384),
        n = i(91402),
        o = i(44586),
        l = i(95195);
      function c({ scrollToMarkRect: e, scrollToRange: t }) {
        return {
          scrollToMark: (i, c) =>
            (0, a.pipe)(
              r.Fd.getMarkRect(i),
              l.vx(() => (t((0, s.mp)(i.range)), r.Fd.getMarkRect(i))),
              l.g_(
                (e) =>
                  n._(
                    new Error(`Cannot get mark's rect: ${i.id}: ${e.message}`)
                  ),
                (t) =>
                  new o.y((i) => {
                    i.next(void 0), e(t, c);
                  })
              )
            ),
        };
      }
    },
    91815: (e, t, i) => {
      i.r(t),
        i.d(t, {
          AssistantController: () => cr,
          AssistantControllerImpl: () => gr,
          AssistantControllerInjectedParams: () =>
            a.AssistantControllerInjectedParams,
          AssistantService: () => Er,
          AssistantServiceInjectedParams: () =>
            s.AssistantServiceInjectedParams,
          LocalAssistantHighlightCollection: () => r.c,
        });
      var a = {};
      i.r(a), i.d(a, { e: () => cr, Z: () => gr });
      var s = {};
      i.r(s), i.d(s, { e: () => Er });
      var r = i(45662),
        n = i(40327),
        o = i(27378),
        l = i(74850),
        c = i(523),
        d = i(25913),
        u = i(53067),
        p = i(32154),
        m = i(75003),
        h = i(57050),
        g = i(35214),
        v = i(5114),
        f = i(32281),
        w = i(50622),
        b = i(17594),
        S = i(8125),
        y = i(18208),
        _ = i(40330),
        k = i(79880);
      const A = (e) => {
          switch (e) {
            case "experiment_human_category":
              return (0, h.ls)(C, T);
            case "experiment_benefits":
              return (0, h.ls)(E, T);
            default:
              return;
          }
        },
        C = (e) =>
          I(e, (e) => (b.$.isPremium(e) ? e.categoryHuman : e.lensName)),
        E = (e) =>
          I(e, (e) =>
            (0, h.zG)(
              e.bundleInfo,
              v.map((e) => e.title),
              v.getOrElse(() => e.lensName)
            )
          ),
        I = (e, t) => {
          const i = Object.values(
            e.reduce((e, i) => {
              const a = t(i);
              return (
                null != e[a]
                  ? (e[a] = {
                      ...e[a],
                      alertsGroup: a,
                      alertsCount: e[a].alertsCount + 1,
                    })
                  : (e[a] = { alertsGroup: a, alertsCount: 1 }),
                e
              );
            }, {})
          );
          return M(i);
        },
        M = (e) => {
          const t = e.sort((e, t) => t.alertsCount - e.alertsCount),
            i = t.slice(0, 3),
            a = t
              .slice(3)
              .map((e) => e.alertsCount)
              .reduce(S.Sm, 0);
          return t.length > 3
            ? [...i, { alertsGroup: "more...", alertsCount: a }]
            : i;
        },
        T = (e) => {
          const t = e.map((e) =>
            _.X2.create(
              [
                {
                  type: "block",
                  fraction: 1,
                  horizontalAlign: k.Kq.Center,
                  name: "counter",
                  parts: [
                    {
                      type: "count",
                      backgroundColor: k.Il.CoreYellow20,
                      textColor: k.Il.CoreYellow80,
                      value: e.alertsCount.toString(),
                      id: "#count-counter",
                    },
                  ],
                  id: "#block-counter",
                },
                {
                  type: "block",
                  fraction: 11,
                  name: "alertGroup",
                  parts: [
                    _.xv.create(
                      y.kC(e.alertsGroup),
                      k.yH.Regular,
                      [],
                      k.Il.CoreNeutral90,
                      void 0,
                      void 0
                    ),
                  ],
                  id: "#block-alert-group",
                },
              ],
              [],
              _.Ki.create("0.5", "0.25", "0.25", "0.75")
            )
          );
          return _.sg.create([
            _.X2.create(
              [
                _.gO.create(
                  "title",
                  void 0,
                  void 0,
                  _.xv.create(
                    "Premium suggestions available:",
                    k.yH.Regular,
                    [k.SQ.Bold],
                    k.Il.CoreNeutral90,
                    void 0,
                    void 0
                  )
                ),
              ],
              [],
              _.Ki.create("0.75", "0.25", "0.5", "0.75")
            ),
            _.gO.create("content", void 0, void 0, ...t),
            _.X2.create(
              [
                {
                  type: "button",
                  id: "goPremium",
                  name: "goPremium",
                  actions: [{ type: "upgradeToPremium" }],
                  kind: k.Lv.Primary,
                  state: k.BN.Enabled,
                  label: {
                    ..._.gO.create(
                      "",
                      _.Ki.create("0", "0.5", "0", "0.25"),
                      { horizontal: k.T.D025, vertical: k.T.D025 },
                      _.JO.create(
                        _.JO.Source.createKnown(k.Tb.Diamond),
                        void 0
                      ),
                      _.xv.create(
                        "Unlock Premium",
                        k.yH.Regular,
                        [],
                        k.Il.CoreNeutral0,
                        void 0,
                        void 0
                      )
                    ),
                    verticalAlign: k.g$.Middle,
                  },
                },
                {
                  type: "button",
                  id: "dismiss",
                  name: "dismiss",
                  actions: [{ type: "removeCard" }],
                  kind: k.Lv.Secondary,
                  state: k.BN.Enabled,
                  label: _.gO.create(
                    "",
                    _.Ki.create("0", "0.5", "0", "0.5"),
                    { horizontal: k.T.D025, vertical: k.T.D0 },
                    _.xv.create(
                      "Dismiss",
                      k.yH.Regular,
                      [],
                      k.Il.CoreNeutral50,
                      void 0,
                      void 0
                    )
                  ),
                },
              ],
              [
                _.gO.create(
                  "navigation-arrows",
                  void 0,
                  void 0,
                  _.zx.createIcon(
                    "prev",
                    _.JO.Source.createKnown(k.Tb.ArrowLeft),
                    [
                      { type: "prevCard" },
                      {
                        type: "transition",
                        fromName: "content",
                        toName: "content",
                        animateFrom: k.c1.SlideRight,
                        animateTo: k.c1.SlideRight,
                      },
                      {
                        type: "transition",
                        fromName: "title",
                        toName: "title",
                        animateFrom: k.c1.SlideRight,
                        animateTo: k.c1.SlideRight,
                      },
                    ],
                    k.Lv.Secondary,
                    "Previous suggestion"
                  ),
                  _.zx.createIcon(
                    "next",
                    _.JO.Source.createKnown(k.Tb.ArrowRight),
                    [{ type: "nextCard" }],
                    k.Lv.Secondary,
                    "Next suggestion"
                  )
                ),
              ],
              _.Ki.create("0.5", "0.25", "1", "0.75")
            ),
          ]);
        };
      var x,
        R = i(9671),
        L = i(5178),
        F = i(19654),
        P = i(59456),
        V = i(31536),
        B = i(68654),
        O = i(35435),
        N = i(16797),
        D = i(26027),
        U = i(20594),
        H = i(77610),
        j = i(16892),
        W = i(48521),
        G = i(60682),
        z = i(35416),
        q = i(25975),
        K = i(22232),
        Z = i(83078),
        X = i(73975),
        Y = i(45701);
      !(function (e) {
        function s() {
          return {
            viewState: (e, t) => (t) => {
              switch (t.kind) {
                default:
                case D.X.Kind:
                  return (
                    (0, K.kG)(
                      H.C.isSDUIAlertsItem(t),
                      "cannot render alert cards without SDUI content"
                    ),
                    {
                      view: t,
                      isLastCard: e,
                      kind: "alertCard",
                      visibleViewportHeight: v.none,
                    }
                  );
                case G.B.Kind:
                  return { view: t, kind: "upgradeHookCard" };
              }
            },
          };
        }
        (e.isSelectableWithAlertItem = i),
          (e.getActiveItemWithAlert = z.In.getActiveItemOfType(
            e.isSelectableWithAlertItem
          )),
          (e.getActiveAlignableItem = z.In.getActiveItemOfType(
            e.isSelectableWithAlertItem
          )),
          (e.getActiveFocusableItem = z.In.getActiveItemOfType(
            e.isSelectableWithAlertItem
          )),
          (e.checksFeedItemsMapper = t),
          (e.isAlertCard = i),
          (e.isUpgradeHook = a),
          (e.defaultOrd = (0, g.fold)(Y.getMonoid())([
            (0, n.pipe)(Y.ordBoolean, Y.contramap(a)),
            (0, n.pipe)(Y.ordBoolean, Y.contramap(i)),
            D.X.ord,
          ])),
          (e.item = O.w),
          (e.viewState = s),
          (e.createCardListFlow = N.p),
          (e.listItemOrd = (e) =>
            Y.contramap((e) => e.cell.item.view)(e).compare);
        const r = {
            equals: (e, t) => e.kind === t.kind && j.s.eqById.equals(e, t),
          },
          o = (e, t) => ({
            equals: (i, a) => {
              const s = { [D.X.Kind]: e, [G.B.Kind]: t };
              return (
                r.equals(i, a) &&
                (function (e, t) {
                  return (i, a) => t[e(i)].equals(i, a);
                })((e) => e.kind, s)(i, a)
              );
            },
          }),
          l = (0, g.fold)(X.uZ())([W.o.eq, j.s.verticalPositionEq, r]);
        function c(e) {
          const i = D.X.Capabilities.getChangePosition(e);
          return {
            changePosition: (e) =>
              z.nL.Items.mapper((e) => i.changePosition(e).kind, {
                [D.X.Kind]: i.changePosition(e),
                [G.B.Kind]: G.B.Capabilities.changePosition(e),
              }),
          };
        }
        function d(e) {
          const i = D.X.Capabilities.getAnimatable(e);
          return {
            completeTransition: (e) =>
              z.nL.Items.mapper((e) => i.completeTransition(e).kind, {
                [D.X.Kind]: i.completeTransition(e),
                [G.B.Kind]: G.B.Capabilities.animatable.completeTransition(e),
              }),
            transitionTo: (e) =>
              z.nL.Items.mapper((e) => i.transitionTo(e).kind, {
                [D.X.Kind]: i.transitionTo(e),
                [G.B.Kind]: G.B.Capabilities.animatable.transitionTo(e),
              }),
            changeVisualState: (e) =>
              z.nL.Items.mapper((e) => i.changeVisualState(e).kind, {
                [D.X.Kind]: i.changeVisualState(e),
                [G.B.Kind]: G.B.Capabilities.animatable.changeVisualState(e),
              }),
          };
        }
        function u(e) {
          const i = D.X.Capabilities.getSelect(e);
          return {
            select: (e, a, s) =>
              z.nL.Items.mapper((e) => i.select(e, a, s).kind, {
                [D.X.Kind]: i.select(e, a, s),
                [G.B.Kind]: G.B.Capabilities.select.select(e, a, s),
              }),
            selectByAlert: (e, a, s, r) =>
              z.nL.Items.mapper((e) => i.selectByAlert(e, a, s, r).kind, {
                [D.X.Kind]: i.selectByAlert(e, a, s, r),
                [G.B.Kind]: G.B.Capabilities.select.selectByAlert(e, a, s, r),
              }),
            unselect: (e, a) =>
              z.nL.Items.mapper((e) => i.unselect((0, h.MZ)(e), a).kind, {
                [D.X.Kind]: i.unselect((0, h.MZ)(e), a),
                [G.B.Kind]: G.B.Capabilities.select.unselect(e, a),
              }),
          };
        }
        function p(e) {
          return {
            removeAlertFromItem: (a, s) =>
              z.nL.Items.mapper(
                (e) =>
                  ((t) =>
                    D.X.Capabilities.getRemoveAlerts(e, s.itemsOrd)(
                      a,
                      z.In.getActiveItemOfType(i)(s)
                    )(t)).kind,
                {
                  [D.X.Kind]: (t) =>
                    D.X.Capabilities.getRemoveAlerts(e, s.itemsOrd)(
                      a,
                      z.In.getActiveItemOfType(i)(s)
                    )(t),
                  [G.B.Kind]: h.yR,
                }
              ),
          };
        }
        function m(e) {
          const i = D.X.Capabilities.getRemove(e);
          return {
            remove: (e, a) =>
              z.nL.Items.mapper((e) => i.remove(e, a).kind, {
                [D.X.Kind]: i.remove(e, a),
                [G.B.Kind]: G.B.Capabilities.remove.remove(e, a),
              }),
          };
        }
        function f(e) {
          const i = D.X.Capabilities.getUpdateWithAlert(e);
          return {
            updateWithAlerts: (e) =>
              z.nL.Items.mapper((e) => i.updateWithAlerts(e).kind, {
                [D.X.Kind]: i.updateWithAlerts(e),
                [G.B.Kind]: h.yR,
              }),
          };
        }
        function w(e) {
          const i = U.Mq.getCardSelections(e);
          return {
            nextAlert: z.nL.Items.mapper((e) => i.nextAlert.kind, {
              [D.X.Kind]: i.nextAlert,
              [G.B.Kind]: () => v.none,
            }),
            prevAlert: z.nL.Items.mapper((e) => i.prevAlert.kind, {
              [D.X.Kind]: i.prevAlert,
              [G.B.Kind]: () => v.none,
            }),
          };
        }
        function b() {
          return {
            updateUserInput: (e) =>
              z.nL.Items.mapper((e) => D.X.updateUserInput(e).kind, {
                [D.X.Kind]: D.X.updateUserInput(e),
                [G.B.Kind]: h.yR,
              }),
          };
        }
        (e.equatable = {
          structEq: o(D.X.eq, G.B.eq),
          idEq: o(r, r),
          visualStateEq: o(l, G.B.eq),
        }),
          (e.changePosition = c),
          (e.disposable = {
            isScheduledToDispose: z.nL.Items.mapper(
              (e) => ((e) => H.C.willBeDisposed(e, e.removedAlertsIds)).kind,
              {
                [D.X.Kind]: (e) => H.C.willBeDisposed(e, e.removedAlertsIds),
                [G.B.Kind]: h.jv,
              }
            ),
          }),
          (e.hidable = {
            isHidden: z.nL.Items.mapper((e) => W.o.isHidden.kind, {
              [D.X.Kind]: W.o.isHidden,
              [G.B.Kind]: W.o.isHidden,
            }),
          }),
          (e.animatableItem = d),
          (e.hasAlertsQueries = {
            isSelectableByAlert: (e) =>
              z.nL.Items.mapper((e) => H.C.hasAlert(e.alert.id).kind, {
                [D.X.Kind]: H.C.hasAlert(e.alert.id),
                [G.B.Kind]: h.jv,
              }),
            hasAlert: (e) =>
              z.nL.Items.mapper((e) => H.C.hasAlert(e).kind, {
                [D.X.Kind]: H.C.hasAlert(e),
                [G.B.Kind]: h.jv,
              }),
            hasActiveAlert: z.nL.Items.mapper((e) => H.C.hasActiveAlert.kind, {
              [D.X.Kind]: H.C.hasActiveAlert,
              [G.B.Kind]: Z.cS,
            }),
          }),
          (e.changePositionStrategyQueries = {
            useReferenceHeightOnRemove: z.nL.Items.mapper((e) => h.jv.kind, {
              [D.X.Kind]: h.jv,
              [G.B.Kind]: h.jv,
            }),
          }),
          (e.select = u),
          (e.removeAlert = p),
          (e.remove = m),
          (e.updateWithAlert = f),
          (e.releaseAlert = (t) =>
            q.v.Capabilities.getAlertReleaser({ ...p(t), ...e.disposable })),
          (e.unselectable = (e) =>
            q.v.Capabilities.getUnselectable(z.In.getActiveItem, u(e))),
          (e.selectableByAlert = (t) =>
            q.v.Capabilities.getSelectableByAlert(z.In.getActiveItem, {
              ...e.hasAlertsQueries,
              ...u(t),
              ...q.v.Capabilities.getHasChecksFeed(),
            })),
          (e.selectableById = (e) =>
            q.v.Capabilities.getSelectableById(z.In.getActiveItem, u(e))),
          (e.updateMeta = () => ({
            updateMeta: q.v.Capabilities.getMetaUpdatable().updateMeta,
          })),
          (e.animatableFeed = (e) =>
            q.v.Capabilities.getAnimatable(e, {
              ...p(e),
              ...d(e),
              ...q.v.Capabilities.getHasChecksFeed(),
            })),
          (e.hasPriorityToggle = (t) =>
            q.v.WithPriority.getHasPriorityToggle({
              ...d(t),
              ...e.hasAlertsQueries,
              ...e.disposable,
            })),
          (e.alignable = {
            isValidToAlign: z.nL.Items.mapper(
              (e) => ((t) => !e.disposable.isScheduledToDispose(t)).kind,
              {
                [D.X.Kind]: (t) => !e.disposable.isScheduledToDispose(t),
                [G.B.Kind]: h.jv,
              }
            ),
          }),
          (e.alertIterator = w),
          (e.itemReleaser = () => q.v.Capabilities.getItemReleaser()),
          (e.hasAlerts = q.v.Capabilities.getHasAlerts),
          (e.getDefaultNextAlertItemFilter = (t) =>
            (0, S.W9)(
              e.isSelectableWithAlertItem,
              (i) =>
                !e.disposable.isScheduledToDispose(i) &&
                (0, n.pipe)(
                  i,
                  e.hasAlertsQueries.hasActiveAlert,
                  v.map((e) => t.isRegistered(e.alert.id)),
                  v.getOrElse(h.jv)
                )
            )),
          (e.hasUserInput = b),
          (e.verifiable = () => q.v.Capabilities.getVerifiable(e.disposable)),
          (e.cloneable = () => ({
            clone: z.nL.Items.mapper(
              (e) => D.X.Capabilities.getCloneable().clone.kind,
              {
                [D.X.Kind]: D.X.Capabilities.getCloneable().clone,
                [G.B.Kind]: j.s.Capabilities.getPojoCloneable().clone,
              }
            ),
          })),
          (e.getCapabilities = function (t, i) {
            return {
              ...s(),
              ...e.disposable,
              ...e.hidable,
              ...e.equatable,
              ...b(),
              ...e.cloneable(),
              ...c(t),
              ...d(t),
              ...u(t),
              ...m(t),
              ...p(t),
              ...f(t),
              ...e.hasAlertsQueries,
              ...e.changePositionStrategyQueries,
              ...e.alignable,
              ...e.releaseAlert(t),
              ...e.unselectable(t),
              ...e.selectableByAlert(t),
              ...e.selectableById(t),
              ...e.updateMeta(t),
              ...e.animatableFeed(t),
              ...e.hasPriorityToggle(t),
              ...e.itemReleaser(),
              ...e.verifiable(),
              ...e.cloneable(),
              ...e.hasAlerts(w(i), i, () => e.isSelectableWithAlertItem, {
                ...e.hasAlertsQueries,
                ...e.disposable,
              }),
            };
          });
      })(x || (x = {}));
      var Q,
        $ = i(7309),
        J = i(85985),
        ee = i(15646);
      !(function (e) {
        let t;
        !(function (e) {
          e.learnMore = "learnMore";
        })((t = e.Type || (e.Type = {}))),
          (e.isDefault = function (e) {
            return e.type === m.aH.Type.default;
          }),
          (e.isEmogenie = function (e) {
            return e.type === m.aH.Type.emogenie;
          }),
          (e.isSettings = function (e) {
            return e.type === m.aH.Type.settings;
          }),
          (e.isFeedback = function (e) {
            return e.type === m.aH.Type.feedback;
          }),
          (e.isLearnMore = function (t) {
            return t.type === e.Type.learnMore;
          });
      })(Q || (Q = {}));
      class te extends m.D$ {
        constructor(e, t, i, a, s, r, n) {
          super(
            t,
            i,
            { type: m.aH.Type.default },
            { type: m.aH.Type.default },
            new Set([m.aH.Type.emogenie, Q.Type.learnMore]),
            a,
            $.V.singleCardAssistantLayout
          ),
            this._sub.add(
              this._activeView.subscribe((t) => {
                t.type !== m.aH.Type.settings || e.assistantSettingsShow();
              })
            ),
            this._sub.add(
              s
                .pipe(J.h(ee.lY.isSDUICardAction))
                .subscribe(({ actions: e }) => {
                  e.forEach((e) => {
                    "closeCard" === e.type
                      ? r()
                      : "openSettings" === e.type
                      ? this.pushActiveView({ type: m.aH.Type.settings })
                      : "openFeedback" === e.type
                      ? this.pushActiveView({ type: m.aH.Type.feedback })
                      : "openToneDetector" === e.type
                      ? this.pushActiveView({ type: m.aH.Type.emogenie })
                      : "openLearnMore" === e.type
                      ? this.pushActiveView({ type: Q.Type.learnMore })
                      : ("prevCard" !== e.type && "nextCard" !== e.type) ||
                        null == n ||
                        n();
                  });
                })
            );
        }
        activeViewHasAlerts() {
          return Q.isDefault(this._activeView.get());
        }
        pushActiveView(e) {
          this.replaceActiveView(e);
        }
      }
      var ie,
        ae = i(40018),
        se = i(14532),
        re = i(98403),
        ne = i(14601),
        oe = i(77176),
        le = i(38983);
      !(function (e) {
        (e.correct = "correct"),
          (e.incorrect = "incorrect"),
          (e.neutral = "neutral");
      })(ie || (ie = {}));
      class ce {
        constructor(e, t, i, a) {
          (this._learnMoreInfo = le.h.create(null)),
            (this._sub = new ne.w()),
            this._sub.add(
              e
                .pipe(
                  oe.U((e) => {
                    let s = null;
                    if (z.nL.hasItems(e)) {
                      const r = (0, n.pipe)(
                          a(e.currentLens),
                          v.getOrElseW(() => null)
                        ),
                        o = r
                          ? (0, n.pipe)(
                              t.getById(r.activeAlert.id),
                              v.getOrElseW(() => null)
                            )
                          : null,
                        l = (0, n.pipe)(
                          v.fromNullable(o),
                          v.chain(ae.bZ.getRawId),
                          v.getOrElseW(() => null)
                        ),
                        c = l ? i.alerts.getAlertById(l) : null;
                      c &&
                        f.S.isCapiAlert(c) &&
                        (s = {
                          title: c.todo,
                          details: c.details || c.explanation,
                          examples: (0, n.pipe)(
                            se.J.parse(
                              c.examples,
                              c.point.includes("Italicization")
                            ),
                            v.map((e) =>
                              e
                                .map((e) =>
                                  e.map((e) => ({
                                    type:
                                      e.color === se.J.Color.green
                                        ? ie.correct
                                        : e.color === se.J.Color.red
                                        ? ie.incorrect
                                        : ie.neutral,
                                    title: (0, n.pipe)(
                                      e.title,
                                      v.map((e) => `${e}:`),
                                      v.getOrElseW(() => null)
                                    ),
                                    text: e.text,
                                    useItalicText: !e.hasItalic,
                                  }))
                                )
                                .flat()
                            ),
                            v.getOrElseW(() => [])
                          ),
                        });
                    }
                    return s;
                  })
                )
                .subscribe(re.wW(this._learnMoreInfo))
            );
        }
        get learnMoreInfo() {
          return this._learnMoreInfo.view();
        }
        dispose() {
          this._sub.unsubscribe();
        }
      }
      i(36572);
      const de =
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
      var ue,
        pe = i(73582),
        me = i(73763),
        he = i(4390),
        ge = i(60797),
        ve = i(32952);
      !(function (e) {
        (e.isToneAISuggestionInfo = function (e) {
          return "emojiId" in e;
        }),
          (e.isToneTransformSuggestionInfo = function (e) {
            return "emojiLiteral" in e;
          }),
          (e.isToneTransformSuggestionUphookInfo = function (e) {
            return "alertIsHidden" in e && e.alertIsHidden;
          });
      })(ue || (ue = {}));
      class fe {
        constructor(e, t, i, a, s, r, o, l, c, d, u) {
          (this._alertsReader = e),
            (this._getSessionUuid = i),
            (this._gnar = a),
            (this.emogenieService = r),
            (this._upgradeViewModel = l),
            (this._assistantLayoutViewModel = c),
            (this._sub = new ne.w()),
            (this._showingToneSuggestion = le.h.create(false)),
            (this._jumpToToneSuggestionAlertId = new ve.xQ());
          const p = t.view((e) => {
              const t = he.p.reduce([], (e, t) => (e.push(t.alert), e))(e);
              return fe.getToneSuggestionInfoFromAlerts(t);
            }),
            m =
              p.get() &&
              ue.isToneTransformSuggestionUphookInfo(p.get()) &&
              "test" === s.getTreatment(me.p.ToneDetectorUphook);
          (this.toneSuggestionInfo = u || m ? p : le.h.create(void 0).view()),
            this._sub.add(
              o
                .pipe(
                  oe.U((e) => {
                    if (z.nL.hasItems(e)) {
                      const t = (0, n.pipe)(
                          d(e.currentLens),
                          v.getOrElseW(() => null)
                        ),
                        i = t
                          ? (0, n.pipe)(
                              this._alertsReader.getById(t.activeAlert.id),
                              v.getOrElseW(() => null)
                            )
                          : null;
                      return (
                        !!i && i.patternName.startsWith("Style/ToneImprovement")
                      );
                    }
                    return false;
                  })
                )
                .subscribe(re.wW(this._showingToneSuggestion))
            );
        }
        get showingToneSuggestion() {
          return this._showingToneSuggestion.view();
        }
        static getToneSuggestionInfoFromAlerts(e) {
          const t = e
              .filter((e) => e.patternName.startsWith("Style/ToneImprovement"))
              .map((e) => {
                if (ae.bZ.isToneAI(e))
                  return {
                    emojiId: e.toneAlternatives[1].emojiID,
                    title: e.miniCardTitle,
                    alertId: e.id,
                    toneCategory: e.patternName,
                    patternName: e.patternName,
                  };
                {
                  let t, i, a, s;
                  if (e._raw.hidden) {
                    const r = e._raw.title.match(de);
                    (t = r && r.length ? r[0] : ""),
                      (i = e._raw.title.replace(de, "").trim()),
                      (a = i),
                      (s = true);
                  } else
                    (t = (0, n.pipe)(
                      e.extraProperties.tone,
                      v.map((e) => e.emoji),
                      v.getOrElseW(() => "")
                    )),
                      (i = e.miniCardTitle.replace(de, "").trim()),
                      (a = (0, n.pipe)(
                        e.extraProperties.tone,
                        v.map((e) => e.name),
                        v.getOrElseW(() => "")
                      )),
                      (s = false);
                  return {
                    emojiLiteral: t,
                    title: i,
                    alertId: e.id,
                    toneCategory: a,
                    patternName: e.patternName,
                    alertIsHidden: s,
                  };
                }
              }),
            i = t.reduce((e, t) => e.add(t.toneCategory), new Set()),
            a = t[0];
          return i.size > 1 ? { ...a, title: "Want to adjust your tone?" } : a;
        }
        _getCurrentSessionUuid() {
          return (0, n.pipe)(
            this._getSessionUuid(),
            v.getOrElse(() => "")
          );
        }
        getJumpToToneSuggestionSideEffect() {
          return {
            id: "jumpToToneSuggestionSideEffect",
            when: h.W8,
            what: z.nL.Effect.SwitchAlert.create(
              this._jumpToToneSuggestionAlertId.pipe(
                oe.U(this._alertsReader.getById),
                ge.oA,
                oe.U((e) => ({
                  alertHighlight: {
                    alert: b.$.fromModel(e),
                    highlightIndex: 0,
                  },
                  alertSource: ae.l$.sidebar,
                  options: {},
                }))
              )
            ),
          };
        }
        onShowToneSuggestionInfo(e) {
          const t = ue.isToneAISuggestionInfo(e) ? e.emojiId : e.emojiLiteral,
            i = ue.isToneTransformSuggestionUphookInfo(e);
          this._gnar.toneDetectorToneSuggestionInfoShow(
            t,
            i,
            e.patternName,
            this._getCurrentSessionUuid(),
            e.title
          );
        }
        onClickToneSuggestionInfoCta(e) {
          const t = ue.isToneAISuggestionInfo(e) ? e.emojiId : e.emojiLiteral,
            i = ue.isToneTransformSuggestionUphookInfo(e);
          this._gnar.toneDetectorToneSuggestionInfoCtaClick(
            t,
            i,
            e.patternName,
            this._getCurrentSessionUuid(),
            e.title
          ),
            i
              ? this._upgradeViewModel.openUpgradeUrl(pe.L.Place.toneSuggestion)
              : (this._assistantLayoutViewModel.popActiveView(),
                this._jumpToToneSuggestionAlertId.next(e.alertId));
        }
        dispose() {
          this._sub.unsubscribe();
        }
      }
      var we = i(10299),
        be = i(77394),
        Se = i(86620),
        ye = i(16868),
        _e = i(51540),
        ke = i(40081),
        Ae = i(62346),
        Ce = i(92783),
        Ee = i(90361),
        Ie = i(44618),
        Me = i(84966),
        Te = i(66896),
        xe = i(13313),
        Re = i(29317),
        Le = i(74859),
        Fe = i(21619),
        Pe = i(54216),
        Ve = i(15701),
        Be = i(48052),
        Oe = i(4330),
        Ne = i(35607),
        De = i(4890),
        Ue = i(73841),
        He = i(89770),
        je = i(39920),
        We = i(74364),
        Ge = i(76974),
        ze = i(17343),
        qe = i(83401),
        Ke = i(66310),
        Ze = i(40151),
        Xe = i(95574),
        Ye = i(95195),
        Qe = i(81531);
      var $e,
        Je = i(5920),
        et = i(39648),
        tt = i(93265),
        it = i(28043),
        at = i(41398),
        st = i(24209);
      !(function (e) {
        const t = (0, S.HP)(l.Y.create),
          i = (e) => "column" === e.type;
        let a;
        (e.BulkDismissBufferCardName = "bulk-dismiss-buffer-card"),
          (e.BulkDismissBufferCardId = _.JX.from(e.BulkDismissBufferCardName)),
          (e.BulkDismissBufferCardDismissButtonName =
            "bulk-dismiss-buffer-card-dismiss-button"),
          (e.BulkDismissBufferCardDismissButtonId = _.JX.from(
            e.BulkDismissBufferCardDismissButtonName
          )),
          (e.BulkDismissBufferCardDismissReviewAllButtonName =
            "bulk-dismiss-buffer-card-review-all-button"),
          (e.BulkDismissBufferCardDismissReviewAllButtonId = _.JX.from(
            e.BulkDismissBufferCardDismissReviewAllButtonName
          )),
          (e.isBulkDismissBufferCardSDUI = (t) =>
            (0, n.pipe)(
              t.cardDSL,
              v.exists(
                (0, S.W9)(i, (t) => t.name === e.BulkDismissBufferCardName)
              )
            )),
          (e.findBulkDismissItem = (e) =>
            (0, n.pipe)(
              e,
              v.fromPredicate(z.nL.hasCards),
              v.chain((e) =>
                Je.l.find(
                  e.currentLens.items,
                  (0, S.W9)(
                    et.P.isAlertRefSDUIItem,
                    et.P.Item.isBulkDismissSDUI
                  )
                )
              )
            )),
          (function (i) {
            let a, s, r, o;
            !(function (i) {
              (i.getBulkDismissBufferCardSDUI = (t) => ({
                ..._.sg.create([
                  _.X2.create(
                    [],
                    [],
                    _.Ki.create("0.5", "0.5", "0.25", "0.75")
                  ),
                  _.sg.create([
                    _.X2.create(
                      [
                        _.gO.create(
                          "bulk-dismiss-buffer-card-content-image-block",
                          _.Ki.create("0", "1", "0", "0"),
                          void 0,
                          {
                            type: "image",
                            width: 4,
                            height: 4.5,
                            name: "bulk-dismiss-buffer-card-content-image",
                            id: _.JX.from(
                              "bulk-dismiss-buffer-card-content-image"
                            ),
                            url: "https://assets.grammarly.com/icons/v1/bulk-dismiss-buffer-card.svg",
                          }
                        ),
                        _.sg.create([
                          _.X2.create(
                            [
                              _.gO.create(
                                "bulk-dismiss-buffer-card-content-description-title",
                                void 0,
                                void 0,
                                _.xv.create(
                                  `${t} suggestions dismissed for you`,
                                  k.yH.Regular,
                                  [k.SQ.Bold],
                                  k.Il.CoreNeutral90,
                                  void 0,
                                  void 0
                                )
                              ),
                            ],
                            [],
                            _.Ki.create("0", "0", "0", "1")
                          ),
                          _.X2.create(
                            [
                              _.gO.create(
                                "bulk-dismiss-buffer-card-content-description-text",
                                void 0,
                                void 0,
                                _.xv.create(
                                  "We hid these suggestions because they didn’t seem relevant to your text.",
                                  k.yH.Regular,
                                  [],
                                  k.Il.CoreNeutral50,
                                  void 0,
                                  void 0
                                )
                              ),
                            ],
                            [],
                            _.Ki.create("0.5", "0", "0", "1")
                          ),
                        ]),
                      ],
                      [],
                      _.Ki.create("0.5", "1", "0.5", "1")
                    ),
                  ]),
                  _.X2.create(
                    [
                      _.gO.create(
                        "bulk-dismiss-buffer-card-actions",
                        void 0,
                        _.n4.create("0.5", "0"),
                        {
                          type: "button",
                          name: e.BulkDismissBufferCardDismissReviewAllButtonName,
                          id: e.BulkDismissBufferCardDismissReviewAllButtonId,
                          label: {
                            ..._.gO.create(
                              "bulk-dismiss-buffer-card-review-button-label",
                              _.Ki.create("0", "0.5", "0", "0.5"),
                              void 0,
                              _.xv.create(
                                "Review them",
                                k.yH.Regular,
                                [],
                                k.Il.CoreNeutral0,
                                void 0,
                                void 0
                              )
                            ),
                            verticalAlign: k.g$.Middle,
                          },
                          actions: [{ type: "notify", userAction: k.nz.Click }],
                          kind: k.Lv.Primary,
                          state: k.BN.Enabled,
                        },
                        {
                          type: "button",
                          name: e.BulkDismissBufferCardDismissButtonName,
                          id: e.BulkDismissBufferCardDismissButtonId,
                          label: {
                            ..._.gO.create(
                              "bulk-dismiss-buffer-card-dismiss-button-label",
                              _.Ki.create("0", "0.5", "0", "0.5"),
                              void 0,
                              _.xv.create(
                                "Dismiss",
                                k.yH.Regular,
                                [],
                                k.Il.CoreNeutral50,
                                void 0,
                                void 0
                              )
                            ),
                            verticalAlign: k.g$.Middle,
                          },
                          actions: [
                            { type: "notify", userAction: k.nz.Click },
                            { type: "removeCard" },
                          ],
                          kind: k.Lv.Secondary,
                          state: k.BN.Enabled,
                        }
                      ),
                    ],
                    [
                      _.gO.create(
                        "bulk-dismiss-buffer-card-navigation-arrows",
                        void 0,
                        _.n4.create("0.5", "0")
                      ),
                    ],
                    _.Ki.create("0.5", "0.5", "1", "1")
                  ),
                ]),
                name: e.BulkDismissBufferCardName,
              })),
                (i.create = (a) => {
                  const s = t(
                      "BulkDismissSDUI.SideEffects.AddBulkDismissBufferCard.create"
                    ),
                    r = z.nL.Prism.getLensWithItems().compose(
                      tt.v.Prism.getFeedItems()
                    );
                  return {
                    id: "BulkDismissSDUI.SideEffects.AddBulkDismissBufferCard",
                    when: Te.R.isWithAlertsId,
                    what: z.nL.Effect.ItemsApplicator.create(
                      a.bulkDismissAlertsCount.pipe(
                        it.x(),
                        J.h((e) => e > 0),
                        at.M(a.bulkDismissHasBeenReviewed),
                        J.h(([e, t]) => true !== t),
                        oe.U(([e, t]) => e),
                        oe.U((t) => (a) => {
                          s.trace(
                            "Side effect to add/update bulk-dismiss buffer card triggered.",
                            { bulkDismissAlertsCount: t }
                          );
                          const o = Je.l.find(
                              a.currentLens.items,
                              (0, S.W9)(
                                et.P.isAlertRefSDUIItem,
                                et.P.Item.isBulkDismissSDUI
                              )
                            ),
                            l = Je.l.find(
                              a.currentLens.items,
                              (0, S.W9)(
                                et.P.isAlertRefSDUIItem,
                                e.isBulkDismissBufferCardSDUI
                              )
                            );
                          if (v.isNone(l) && v.isSome(o)) {
                            s.trace("Adding bulk dismiss buffer card.", {
                              bulkDismissAlertsCount: t,
                            });
                            const n = et.P.Capabilities.createItem(
                              e.BulkDismissBufferCardId,
                              i.getBulkDismissBufferCardSDUI(
                                o.value.value.alerts.length
                              ),
                              []
                            );
                            return r.set(a.currentLens.items.add(n), a);
                          }
                          if (v.isSome(l) && v.isSome(o)) {
                            s.trace("Updating bulk dismiss buffer card.", {
                              bulkDismissAlertsCount: t,
                            });
                            const o = et.P.Capabilities.createItem(
                              e.BulkDismissBufferCardId,
                              i.getBulkDismissBufferCardSDUI(t),
                              []
                            );
                            return r.set(
                              (0, n.pipe)(
                                a.currentLens.items.update(
                                  l.value.value.id,
                                  () => o
                                ),
                                Xe.MH
                              ),
                              a
                            );
                          }
                          return a;
                        })
                      )
                    ),
                  };
                });
            })(
              (a =
                i.AddBulkDismissBufferCard || (i.AddBulkDismissBufferCard = {}))
            ),
              (function (i) {
                i.create = (i) => {
                  const a = t(
                      "BulkDismissSDUI.SideEffects.RemoveBulkDismissBufferCard.create"
                    ),
                    s = z.nL.Prism.getLensWithItems().compose(
                      tt.v.Prism.getFeedItems()
                    );
                  return {
                    id: "BulkDismissSDUI.SideEffects.RemoveBulkDismissBufferCard",
                    when: Te.R.isWithAlertsId,
                    what: z.nL.Effect.ItemsApplicator.create(
                      st
                        .T(
                          i.bulkDismissHasBeenReviewed.pipe(
                            J.h((e) => true === e)
                          ),
                          i.bulkDismissAlertsCount.pipe(J.h((e) => 0 === e))
                        )
                        .pipe(
                          ze.h((t) => {
                            const i = Je.l.find(
                              t.currentLens.items,
                              (0, S.W9)(
                                et.P.isAlertRefSDUIItem,
                                e.isBulkDismissBufferCardSDUI
                              )
                            );
                            return v.isSome(i)
                              ? (a.trace("Removing bulk-dismiss buffer card."),
                                s.set(
                                  t.currentLens.items.remove(i.value.value.id),
                                  t
                                ))
                              : t;
                          })
                        )
                    ),
                  };
                };
              })(
                (s =
                  i.RemoveBulkDismissBufferCard ||
                  (i.RemoveBulkDismissBufferCard = {}))
              ),
              (function (e) {
                e.create = (e, i) => {
                  const a = t(
                    "BulkDismissSDUI.SideEffects.RemoveBulkDismiss.create"
                  );
                  return {
                    id: "BulkDismissSDUI.SideEffects.RemoveBulkDismiss",
                    when: Te.R.isWithAlertsId,
                    what: z.nL.Effect.ItemsApplicator.create(
                      e.bulkDismissBufferCardRemoveActions.pipe(
                        oe.U(({ sourceId: e }) => (t) => {
                          const s = Je.l.find(
                            t.currentLens.items,
                            (0, S.W9)(
                              et.P.isAlertRefSDUIItem,
                              et.P.Item.isBulkDismissSDUI
                            )
                          );
                          return (
                            v.isSome(s) &&
                              (a.trace("Removing bulk-dismiss card."),
                              (0, n.pipe)(
                                s.value.value.cardDSL,
                                v.filter((e) => "strongAlertRef" === e.type),
                                Z.bw((t) =>
                                  i({
                                    type: ee.lY.Type.sduiCardAction,
                                    actions: [{ type: "removeCard" }],
                                    sourceId: e,
                                    cardId: s.value.value.id,
                                    scope: { alertRef: v.some(t) },
                                  })
                                )
                              )),
                            t
                          );
                        })
                      )
                    ),
                  };
                };
              })((r = i.RemoveBulkDismiss || (i.RemoveBulkDismiss = {}))),
              (function (t) {
                t.create = (t, i, a) => ({
                  id: "BulkDismissSDUI.SideEffects.FocusBulkDismiss",
                  when: z.nL.Effect.When.isSidebarOpen,
                  what: z.nL.Effect.ItemsApplicator.create(
                    (0, n.pipe)(
                      t.bulkDismissReviewClicks,
                      oe.U(() => e.findBulkDismissItem(i.get())),
                      ge.oA,
                      oe.U(
                        ({ value: e }) =>
                          (t) =>
                            z.nL.Prism.getLensWithItems().modify(
                              a.selectItemById(e.id, [
                                {
                                  type: "transition",
                                  fromName: "title",
                                  toName: "title",
                                  animateFrom: k.c1.SlideLeft,
                                  animateTo: k.c1.SlideLeft,
                                },
                                {
                                  type: "transition",
                                  fromName: "content",
                                  toName: "content",
                                  animateFrom: k.c1.SlideLeft,
                                  animateTo: k.c1.SlideLeft,
                                },
                              ]),
                              t
                            )
                      )
                    )
                  ),
                });
              })((o = i.FocusBulkDismiss || (i.FocusBulkDismiss = {})));
          })((a = e.SideEffects || (e.SideEffects = {})));
      })($e || ($e = {}));
      var rt = i(37517),
        nt = i(19751),
        ot = i(95300);
      class lt {
        constructor(e, t, i) {
          (this._sduiManager = e),
            (this._subs = new ne.w()),
            (this.bulkDismissFooterReviewClicks = new ve.xQ());
          const a = (0, n.pipe)(
            t.actionEvents,
            J.h(ee.lY.isSDUICardAction),
            nt.skipBy(ee.lY.SDUICardAction.eq),
            J.h(
              (e) =>
                !!e.actions.find((e) => "notify" === e.type) &&
                e.sourceId === $e.BulkDismissBufferCardDismissReviewAllButtonId
            ),
            oe.U(() => {})
          );
          (this.bulkDismissReviewClicks = st.T(
            this.bulkDismissFooterReviewClicks,
            a
          )),
            (this._bulkDismissHasBeenReviewed = new ot.X(false)),
            this._subs.add(
              this.bulkDismissReviewClicks.subscribe(() =>
                this._bulkDismissHasBeenReviewed.next(true)
              )
            ),
            (this.bulkDismissBufferCardRemoveActions = t.actionEvents.pipe(
              J.h(ee.lY.isSDUICardAction),
              nt.skipBy(ee.lY.SDUICardAction.eq),
              J.h(
                (e) =>
                  e.cardId === $e.BulkDismissBufferCardId &&
                  e.sourceId === $e.BulkDismissBufferCardDismissButtonId &&
                  e.actions.some((e) => "removeCard" === e.type)
              )
            )),
            (this.onlyBulkDismissItemsRemain = i.pipe(
              oe.U(
                (e) =>
                  z.nL.hasItems(e) &&
                  e.currentLens.items
                    .values()
                    .every(
                      (e) =>
                        et.P.isAlertRefSDUIItem(e) &&
                        (et.P.Item.isBulkDismissSDUI(e) ||
                          $e.isBulkDismissBufferCardSDUI(e))
                    )
              )
            ));
        }
        get bulkDismissHasBeenReviewed() {
          return this._bulkDismissHasBeenReviewed.asObservable();
        }
        get bulkDismissAlertsCount() {
          return this._sduiManager.state.view((e) =>
            (0, n.pipe)(
              e,
              rt.a.find(
                (e) =>
                  "strongAlertRef" === e.content.type &&
                  "BulkDismiss" === e.content.name
              ),
              v.chain((e) =>
                "strongAlertRef" === e.content.type
                  ? v.some(e.content.alertIds.length)
                  : v.none
              ),
              v.getOrElse(() => 0)
            )
          );
        }
        dispose() {
          this._subs.unsubscribe();
        }
      }
      var ct,
        dt = i(31847),
        ut = i(69621),
        pt = i(79289),
        mt = i(16027);
      !(function (e) {
        const t = (e) =>
          (0, n.pipe)(
            z.In.getActiveItemOfType(a)(e),
            v.chain(et.P.Capabilities.toAlertItem)
          );
        function r() {
          return {
            viewState: () => (e) => {
              switch (e.kind) {
                default:
                case et.P.Kind:
                  return { view: e, kind: "alertRefSDUI" };
                case G.B.Kind:
                  return { view: e, kind: "upgradeHookCard" };
              }
            },
          };
        }
        (e.isSelectableItem = (0, S.Kg)(s, a)),
          (e.getActiveItemWithAlert = function (e) {
            return t(e);
          }),
          (e.getActiveAlignableItem = (e) => t(e)),
          (e.getActiveFocusableItem = (e) => t(e)),
          (e.checksFeedItemsMapper = i),
          (e.isAlertRefSDUI = a),
          (e.isUpgradeHook = s),
          (e.getSDUIClientOrd = (t) =>
            (0, g.fold)(Y.getMonoid())([
              (0, n.pipe)(
                Y.ordBoolean,
                Y.contramap((0, S.ff)(et.P.Item.isBulkAcceptSDUI))
              ),
              (0, n.pipe)(
                Y.ordBoolean,
                Y.contramap(et.P.Item.isBulkDismissSDUI)
              ),
              (0, n.pipe)(
                Y.ordBoolean,
                Y.contramap($e.isBulkDismissBufferCardSDUI)
              ),
              e.getByActiveAlertPositionOrd(t),
            ])),
          (e.getByActiveAlertPositionOrd = (e) =>
            (0, g.fold)(Y.getMonoid())([
              (0, n.pipe)(
                ae.h$.ordHRange,
                Y.contramap((t) =>
                  (0, n.pipe)(
                    e.hasActiveAlert(t),
                    v.map((e) => e.alert),
                    v.getOrElse(() => ({
                      getHighlightRanges: () => [{ start: 0, end: 0 }],
                    }))
                  )
                )
              ),
            ])),
          (e.item = () =>
            mt.UI.Union.make("kind", {
              upgradeHookCard: pt.V.SingleCard,
              alertRefSDUI: dt.p.SingleCard,
              empty: ut.Q.Empty,
            })),
          (e.viewState = r),
          (e.createCardListFlow = N.p),
          (e.listItemOrd = (e) =>
            Y.contramap((e) => e.cell.item.view)(e).compare);
        const o = {
            equals: (e, t) => e.kind === t.kind && j.s.eqById.equals(e, t),
          },
          l = (e, t) => ({
            equals: (i, a) => {
              const s = { [et.P.Kind]: e, [G.B.Kind]: t };
              return (
                o.equals(i, a) &&
                (function (e, t) {
                  return (i, a) => t[e(i)].equals(i, a);
                })((e) => e.kind, s)(i, a)
              );
            },
          });
        function c() {
          return {
            changePosition: (e) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.changePosition(e).kind,
                {
                  [et.P.Kind]: et.P.Capabilities.changePosition(e),
                  [G.B.Kind]: G.B.Capabilities.changePosition(e),
                }
              ),
          };
        }
        function d() {
          return {
            completeTransition: (e) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.animatable.completeTransition(e).kind,
                {
                  [et.P.Kind]:
                    et.P.Capabilities.animatable.completeTransition(e),
                  [G.B.Kind]: G.B.Capabilities.animatable.completeTransition(e),
                }
              ),
            transitionTo: (e) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.animatable.transitionTo(e).kind,
                {
                  [et.P.Kind]: et.P.Capabilities.animatable.transitionTo(e),
                  [G.B.Kind]: G.B.Capabilities.animatable.transitionTo(e),
                }
              ),
            changeVisualState: (e) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.animatable.changeVisualState(e).kind,
                {
                  [et.P.Kind]:
                    et.P.Capabilities.animatable.changeVisualState(e),
                  [G.B.Kind]: G.B.Capabilities.animatable.changeVisualState(e),
                }
              ),
          };
        }
        function u() {
          return {
            select: (e, t, a) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.select.select(e, t, a).kind,
                {
                  [et.P.Kind]: et.P.Capabilities.select.select(e, t, a),
                  [G.B.Kind]: G.B.Capabilities.select.select(e, t, a),
                }
              ),
            selectByAlert: (e, t, a, s) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.select.selectByAlert(e, t, a, s).kind,
                {
                  [et.P.Kind]: et.P.Capabilities.select.selectByAlert(
                    e,
                    t,
                    a,
                    s
                  ),
                  [G.B.Kind]: G.B.Capabilities.select.selectByAlert(e, t, a, s),
                }
              ),
            unselect: (e, t) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.select.unselect((0, h.MZ)(e), t).kind,
                {
                  [et.P.Kind]: et.P.Capabilities.select.unselect(
                    (0, h.MZ)(e),
                    t
                  ),
                  [G.B.Kind]: G.B.Capabilities.select.unselect(e, t),
                }
              ),
          };
        }
        function p() {
          return {
            removeAlertFromItem: (e, t) =>
              z.nL.Items.mapper(
                (e) =>
                  et.P.Capabilities.removeAlert.removeAlertFromItem(e, t).kind,
                {
                  [et.P.Kind]:
                    et.P.Capabilities.removeAlert.removeAlertFromItem(e, t),
                  [G.B.Kind]: h.yR,
                }
              ),
          };
        }
        function m() {
          return {
            remove: (e, t) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.remove.remove(e, t).kind,
                {
                  [et.P.Kind]: et.P.Capabilities.remove.remove(e, t),
                  [G.B.Kind]: G.B.Capabilities.remove.remove(e, t),
                }
              ),
          };
        }
        function f() {
          return {
            updateWithAlerts: (e) =>
              z.nL.Items.mapper((e) => h.yR.kind, {
                [et.P.Kind]: h.yR,
                [G.B.Kind]: h.yR,
              }),
          };
        }
        function w() {
          return {
            nextAlert: z.nL.Items.mapper((e) => (() => v.none).kind, {
              [et.P.Kind]: () => v.none,
              [G.B.Kind]: () => v.none,
            }),
            prevAlert: z.nL.Items.mapper((e) => (() => v.none).kind, {
              [et.P.Kind]: () => v.none,
              [G.B.Kind]: () => v.none,
            }),
          };
        }
        function b() {
          return {
            updateUserInput: (e) =>
              z.nL.Items.mapper((e) => h.yR.kind, {
                [et.P.Kind]: h.yR,
                [G.B.Kind]: h.yR,
              }),
          };
        }
        (e.equatable = {
          structEq: l(et.P.eq, G.B.eq),
          idEq: l(o, o),
          visualStateEq: l(et.P.eq, G.B.eq),
        }),
          (e.changePosition = c),
          (e.disposable = {
            isScheduledToDispose: z.nL.Items.mapper(
              (e) => et.P.Capabilities.disposable.isScheduledToDispose.kind,
              {
                [et.P.Kind]: et.P.Capabilities.disposable.isScheduledToDispose,
                [G.B.Kind]: h.jv,
              }
            ),
          }),
          (e.hidable = {
            isHidden: z.nL.Items.mapper((e) => W.o.isHidden.kind, {
              [et.P.Kind]: W.o.isHidden,
              [G.B.Kind]: W.o.isHidden,
            }),
          }),
          (e.animatableItem = d),
          (e.hasAlertsQueries = {
            isSelectableByAlert: (e) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.hasAlerts.isSelectableByAlert(e).kind,
                {
                  [et.P.Kind]:
                    et.P.Capabilities.hasAlerts.isSelectableByAlert(e),
                  [G.B.Kind]: h.jv,
                }
              ),
            hasAlert: (e) =>
              z.nL.Items.mapper(
                (e) => et.P.Capabilities.hasAlerts.hasAlert(e).kind,
                {
                  [et.P.Kind]: et.P.Capabilities.hasAlerts.hasAlert(e),
                  [G.B.Kind]: h.jv,
                }
              ),
            hasActiveAlert: z.nL.Items.mapper(
              (e) => et.P.Capabilities.hasAlerts.hasActiveAlert.kind,
              {
                [et.P.Kind]: et.P.Capabilities.hasAlerts.hasActiveAlert,
                [G.B.Kind]: Z.cS,
              }
            ),
          }),
          (e.changePositionStrategyQueries = {
            useReferenceHeightOnRemove: z.nL.Items.mapper((e) => h.jv.kind, {
              [et.P.Kind]: h.jv,
              [G.B.Kind]: h.jv,
            }),
          }),
          (e.select = u),
          (e.removeAlert = p),
          (e.remove = m),
          (e.updateWithAlert = f),
          (e.releaseAlert = () =>
            q.v.Capabilities.getAlertReleaser({ ...p(), ...e.disposable })),
          (e.unselectable = () =>
            q.v.Capabilities.getUnselectable(z.In.getActiveItem, u())),
          (e.selectableByAlert = () =>
            q.v.Capabilities.getSelectableByAlert(z.In.getActiveItem, {
              ...e.hasAlertsQueries,
              ...u(),
              ...q.v.Capabilities.getHasChecksFeed(),
            })),
          (e.selectableById = () =>
            q.v.Capabilities.getSelectableById(z.In.getActiveItem, u())),
          (e.updateMeta = () => ({
            updateMeta: q.v.Capabilities.getMetaUpdatable().updateMeta,
          })),
          (e.animatableFeed = (e) =>
            q.v.Capabilities.getAnimatable(e, {
              ...p(),
              ...d(),
              ...q.v.Capabilities.getHasChecksFeed(),
            })),
          (e.hasPriorityToggle = () =>
            q.v.WithPriority.getHasPriorityToggle({
              ...d(),
              ...e.hasAlertsQueries,
              ...e.disposable,
            })),
          (e.alignable = {
            isValidToAlign: z.nL.Items.mapper(
              (e) => ((t) => !e.disposable.isScheduledToDispose(t)).kind,
              {
                [et.P.Kind]: (t) => !e.disposable.isScheduledToDispose(t),
                [G.B.Kind]: h.jv,
              }
            ),
          }),
          (e.alertIterator = w),
          (e.itemReleaser = () => q.v.Capabilities.getItemReleaser()),
          (e.hasAlerts = q.v.Capabilities.getHasAlerts),
          (e.hasUserInput = b),
          (e.verifiable = () => q.v.Capabilities.getVerifiable(e.disposable)),
          (e.cloneable = () => {
            const e = j.s.Capabilities.getPojoCloneable().clone;
            return {
              clone: z.nL.Items.mapper((e) => e.kind, {
                [et.P.Kind]: e,
                [G.B.Kind]: e,
              }),
            };
          });
        const y = {
          getFeatures: z.nL.Items.mapper(
            (e) =>
              ((e) =>
                et.P.Item.isBulkDismissSDUI(e)
                  ? [et.P.Features.BulkDismiss]
                  : et.P.Item.isBulkAcceptSDUI(e)
                  ? [et.P.Features.BulkAccept]
                  : []).kind,
            {
              [et.P.Kind]: (e) =>
                et.P.Item.isBulkDismissSDUI(e)
                  ? [et.P.Features.BulkDismiss]
                  : et.P.Item.isBulkAcceptSDUI(e)
                  ? [et.P.Features.BulkAccept]
                  : [],
              [G.B.Kind]: () => [],
            }
          ),
        };
        e.getCapabilities = function (t, i) {
          return {
            ...r(),
            ...e.disposable,
            ...e.hidable,
            ...e.equatable,
            ...b(),
            ...e.cloneable(),
            ...c(),
            ...d(),
            ...u(),
            ...m(),
            ...p(),
            ...f(),
            ...e.hasAlertsQueries,
            ...e.changePositionStrategyQueries,
            ...e.alignable,
            ...e.releaseAlert(t),
            ...e.unselectable(t),
            ...e.selectableByAlert(t),
            ...e.selectableById(t),
            ...e.updateMeta(t),
            ...e.animatableFeed(t),
            ...e.hasPriorityToggle(t),
            ...e.itemReleaser(),
            ...y,
            ...e.verifiable(),
            ...e.cloneable(),
            ...e.hasAlerts(w(), i, () => e.isSelectableItem, {
              ...e.hasAlertsQueries,
              ...e.disposable,
            }),
          };
        };
      })(ct || (ct = {}));
      var ht = i(2844);
      var gt,
        vt = i(41572),
        ft = i(88056),
        wt = i(35407),
        bt = i(19429);
      !(function (e) {
        (e.Context = o.createContext(
          ft.Y.invariantContent("AssistantTextResources")
        )),
          (e.holder = bt.VF(() => ({
            setGoalsTooltip: "Set goals to get tailored writing suggestions",
            proofitTooltip: "Expert writing help",
          })));
      })(gt || (gt = {}));
      const St = wt.Pj(wt.GG({ denali: vt.m.holder, assistant: gt.holder }))(
        () => ({ denali: {} })
      );
      var yt = i(18756),
        _t = i(38152),
        kt = i(51972),
        At = i(40033),
        Ct = i(68340),
        Et = i(10720),
        It = i(40489),
        Mt = i(93508),
        Tt = i(19962),
        xt = i(5739),
        Rt = i(12187),
        Lt = i(31881),
        Ft = i(33751),
        Pt = i(89379),
        Vt = i(28378),
        Bt = i(62513);
      const Ot = o.forwardRef(({ successView: e }, t) => {
          const i = o.useContext(vt.m.Context),
            a = (0, Pt.hM)((0, Pt.JT)((0, n.pipe)(e, ge.oA), i));
          return o.createElement(
            "div",
            { className: Bt.compactSuccessLens, ref: t },
            o.createElement(
              "div",
              { className: Bt.compactSuccessLensContainer },
              Lt.UI.mount(Vt.q, a)
            )
          );
        }),
        Nt = o.forwardRef(({ viewModels: e }, t) =>
          o.createElement(
            "div",
            { className: Ft.mainView },
            o.createElement(Ut, {
              ref: t,
              state: e.lensState,
              cardsViewModel: e.cardsViewModel,
              upgradeViewModel: e.upgradeViewModel,
              cardsListScrollManager: e.cardsListScrollManager,
              assistantCardListViewModel: e.assistantCardListViewModel,
              predictionsPreviewViewModel: e.predictionsPreviewViewModel,
              assistantFeedbackViewModel: e.assistantFeedbackViewModel,
              headerViewModel: e.assistantHeaderViewModel,
              layoutViewModel: e.assistantLayoutViewModel,
              capabilities: e.capabilities,
              readersAttentionItemViewModel: e.readersAttentionItemViewModel,
            })
          )
        ),
        Dt = ({ position: e, isSuccess: t, children: i }) =>
          o.createElement(
            xt.F.Fragment,
            null,
            e.pipe(
              it.x((e, t) => e.offset === t.offset && e.visible === t.visible),
              oe.U((e) =>
                e.visible
                  ? o.createElement(
                      xt.F.div,
                      {
                        ...(0, Rt.Sh)(
                          Ft.cardListFooterStatic,
                          e.animationInProgress
                            ? Ft.cardListFooterAnimate
                            : void 0,
                          t ? void 0 : Ft.cardListFooterDynamic
                        ),
                        style: t
                          ? {}
                          : { transform: Tt.ux.translateY(e.offset) },
                      },
                      i
                    )
                  : null
              )
            )
          ),
        Ut = o.forwardRef(
          (
            {
              state: e,
              assistantCardListViewModel: t,
              cardsViewModel: i,
              upgradeViewModel: a,
              cardsListScrollManager: s,
              capabilities: r,
              readersAttentionItemViewModel: l,
              ...c
            },
            d
          ) => {
            const u = re.jw((e) => {
                let t = 7;
                return (
                  (t = 31 * t + (0, yt.AC)(e.currentLens.id)),
                  (t =
                    31 * t +
                    (q.v.WithSuccess.State.isInSuccess(r)(e) ? 1231 : 1237)),
                  t
                );
              }, e),
              p = (0, n.pipe)(
                u,
                oe.U((e) => {
                  const t = e.get();
                  return q.v.WithSuccess.State.isInSuccess(r)(t);
                })
              ),
              m = (0, n.pipe)(
                (0, Et.ux)(e, s, r),
                at.M(e),
                oe.U(([e, t]) => ({
                  visible:
                    !z.nL.hasCards(t) ||
                    v.isNone(
                      t.currentLens.items.find(
                        (e) => !e.positionState.isHeightValid
                      )
                    ),
                  offset: e + 6,
                  animationInProgress: true,
                })),
                Mt.O({ visible: false, offset: 0, animationInProgress: true })
              );
            return o.createElement(
              Ct.C,
              {
                className: Ft.cardList,
                onClick: (e) => {
                  e.target.getAttribute("class") === Ft.cardList &&
                    t.assistantActions.next({ type: _t.lo.Type.clickOnEmpty });
                },
                footer: o.createElement(
                  xt.F.Fragment,
                  null,
                  (0, n.pipe)(
                    p,
                    oe.U((e) =>
                      o.createElement(
                        Dt,
                        { position: m, isSuccess: e },
                        o.createElement(At.pL, {
                          predictionsVM: c.predictionsPreviewViewModel,
                        })
                      )
                    )
                  )
                ),
                ref: (e) => {
                  t.cardListViewportHeight.set(
                    v.fromNullable(null == e ? void 0 : e.offsetHeight)
                  );
                },
              },
              (a) =>
                o.createElement(
                  xt.F.Fragment,
                  null,
                  (0, n.pipe)(
                    ht.aj([p, t.havePremiumAlerts]),
                    oe.U(([n, c]) =>
                      n && !c
                        ? o.createElement(
                            o.Fragment,
                            null,
                            o.createElement(Ot, {
                              successView: t.successView,
                              ref: d,
                            })
                          )
                        : o.createElement(Et.hz, {
                            state: e,
                            cardsViewModel: i,
                            cardsListScrollManager: s,
                            connectorElements: a,
                            ref: d,
                            header: o.createElement(
                              o.Fragment,
                              null,
                              c
                                ? o.createElement(
                                    "div",
                                    {
                                      className: Ft.upgradeHookWrapper,
                                      role: "uphook-wrapper",
                                    },
                                    Lt.UI.mount(
                                      It.n.TogglablePanel,
                                      t.upgradeHookFlow
                                    )
                                  )
                                : null
                            ),
                            comparator: kt.O.listItemOrd,
                            capabilities: r,
                            readersAttentionItemViewModel: l,
                          })
                    )
                  )
                )
            );
          }
        ),
        Ht = o.forwardRef(
          ({ viewModels: e, header: t, footer: i, className: a }, s) =>
            o.createElement(
              Ct.C,
              {
                ref: (t) => {
                  "function" == typeof s ? s(t) : s && (s.current = t),
                    e.assistantCardListViewModel.cardListViewportHeight.set(
                      v.fromNullable(null == t ? void 0 : t.offsetHeight)
                    );
                },
                className: a,
              },
              (a) =>
                o.createElement(Et.hz, {
                  state: e.lensState,
                  cardsViewModel: e.cardsViewModel,
                  cardsListScrollManager: e.cardsListScrollManager,
                  connectorElements: a,
                  header: t,
                  footer: i,
                  comparator: kt.O.listItemOrd,
                  capabilities: e.capabilities,
                  readersAttentionItemViewModel: v.none,
                })
            )
        );
      var jt = i(88326),
        Wt = i(73008);
      const Gt = ({
        children: e,
        layoutVM: t,
        panelClassName: i,
        contentClassName: a,
        footer: s,
        onClickBack: r,
        hideBackButton: n = le.h.create(false),
        dataPartName: l,
      }) =>
        o.createElement(
          "div",
          {
            className: Wt.viewOverlay,
            "data-grammarly-part": "assistant-view-overlay",
          },
          o.createElement(
            xt.F.Fragment,
            null,
            n.view(
              (e) =>
                !e &&
                o.createElement(
                  jt.M,
                  {
                    className: Wt.viewOverlayGoBack,
                    clickHandler: () => (r ? r() : t.popActiveView()),
                    dataGrammarlyPart: "assistant-go-back",
                  },
                  "<- Back"
                )
            )
          ),
          o.createElement(
            "div",
            { className: i || Wt.defaultViewOverlayPanel },
            o.createElement(
              "div",
              { className: a || Wt.content, "data-grammarly-part": l },
              e
            ),
            s && o.createElement("div", { className: Wt.footer }, s)
          )
        );
      var zt,
        qt = i(41263),
        Kt = i(53112),
        Zt = i(79461),
        Xt = i(20855),
        Yt = i(80895),
        Qt = i(3860),
        $t = i(64229),
        Jt = i(24468),
        ei = i.n(Jt);
      !(function (e) {
        (e.YES = "yes"), (e.NO = "no");
      })(zt || (zt = {}));
      const ti = ({
        ariaLabel: e,
        voteYesAriaLabel: t,
        voteNoAriaLabel: i,
        onVote: a,
        irrevocable: s = false,
        voteYesTooltipMessage: r,
        voteNoTooltipMessage: n,
        voteNoMenuItems: l,
        onVoteNoMenuToggle: c,
        voteValue: d,
        voteYesMarginRight: u,
      }) => {
        const [p, m] = o.useState(null != d ? d : null);
        o.useEffect(() => {
          d && m(d);
        }, [d]);
        const h = (e) => {
            m(e), a(e);
          },
          g = !s || !p;
        let v = o.createElement(
          Qt.h,
          {
            "aria-label": t,
            disabled: !g,
            onClick: () => h(zt.YES),
            ...(0, Rt.Sh)(
              ei().voteYes,
              p === zt.YES ? ei().voteYesSelected : null
            ),
            style: u ? { marginRight: u } : void 0,
          },
          o.createElement("div", { className: ei().voteYesIcon })
        );
        r &&
          (v = o.createElement(
            Xt.u,
            { message: r, showDelay: 1e3, disabled: !g },
            v
          ));
        let f = o.createElement(
          Qt.h,
          {
            "aria-label": i,
            disabled: !g,
            onClick: l ? void 0 : () => h(zt.NO),
            ...(0, Rt.Sh)(
              ei().voteNo,
              p === zt.NO ? ei().voteNoSelected : null
            ),
          },
          o.createElement("div", { className: ei().voteNoIcon })
        );
        return (
          n &&
            (f = o.createElement(
              Xt.u,
              { message: n, showDelay: 1e3, disabled: !g },
              f
            )),
          l &&
            g &&
            (f = o.createElement(
              $t.m,
              {
                ariaMenuId: "vote-no-menu",
                ariaMenuLabel: "Vote No Menu",
                items: l.map((e) => ({
                  ...e,
                  onClick() {
                    e.disabled || (e.onClick(), h(zt.NO));
                  },
                })),
                placement: "bottom-end",
                size: "medium",
                onToggle: c,
              },
              f
            )),
          o.createElement(
            "div",
            {
              "data-grammarly-part": "ui-kit-vote",
              className: ei().voteContainer,
              role: "group",
              "aria-label": e,
            },
            v,
            f
          )
        );
      };
      var ii = i(79921),
        ai = i(32275),
        si = i(16118),
        ri = i(80900),
        ni = i(8471);
      const oi = ({
        emotion: e,
        isBrandTonesEnabled: t,
        emotionPollValue: i,
        index: a,
        onReportEmotionFeedback: s,
      }) => {
        const r = o.createElement(
            Xt.u,
            { message: `${e.prevalence} intensity`, showDelay: 300 },
            o.createElement(
              "div",
              { className: ni.emogenieReportItemEmotionIntensity },
              [0, 1, 2, 3, 4].map((t) => {
                const i = t / 5 <= e.confidence;
                return o.createElement("div", {
                  key: `${e.name}-intensity-${t}`,
                  ...(0, Rt.Sh)(
                    ni.emogenieReportItemEmotionIntensityDot,
                    i && ni.emogenieReportItemEmotionIntensityDotActive
                  ),
                });
              })
            )
          ),
          n = e.brandToneLabel
            ? o.createElement(Yt.C, {
                title: `${e.brandToneLabel}-BRAND`,
                kind: "off" === e.brandToneLabel ? "error" : "primary",
                boldTitle: true,
              })
            : r,
          l = (e) =>
            t
              ? e === Zt.b.dislike
              : e === Zt.b.incorrect || e === Zt.b.offensive,
          c = (0, ai.K)(i).pipe(
            si.G(),
            oe.U(([e, t]) => e === Zt.b.none && l(t)),
            Mt.O(false),
            Ke.w((e) =>
              e ? ri.H(3e3).pipe(ze.h(false), Mt.O(true)) : Ge.of(false)
            )
          ),
          d = o.createElement(
            "div",
            { className: ni.emogenieReportItemFeedback },
            o.createElement("div", {
              className: ni.emogenieReportItemFeedbackIcon,
            }),
            o.createElement(
              "div",
              { className: ni.emogenieReportItemFeedbackText },
              "Your feedback helps us improve ",
              o.createElement("br", null),
              " our accuracy."
            )
          );
        return o.createElement(
          xt.F.div,
          {
            ...(0, Rt.Sh)(
              ni.emogenieReportItem,
              t ? ni.emogenieReportItemBrandTone : null
            ),
          },
          c.pipe(oe.U((e) => (e ? d : null))),
          l(i)
            ? null
            : o.createElement(
                "div",
                { role: `emotion-${a}-${e.name}` },
                o.createElement(
                  "div",
                  { className: ni.emogenieReportItemEmotion },
                  o.createElement(
                    "div",
                    { className: ni.emogenieReportItemEmotionEmojiAndName },
                    o.createElement(ii.dy, {
                      size: "small-medium",
                      unicodeHexArray: [e.emojiId],
                      unicodeLiteral: e.emoji,
                      className: ni.emogenieReportItemEmotionEmoji,
                    }),
                    o.createElement(
                      "span",
                      { className: ni.emogenieReportItemEmotionName },
                      e.name
                    )
                  ),
                  n,
                  o.createElement(ti, {
                    ariaLabel: `Does the emotion "${e.name}" seem correct?`,
                    voteYesAriaLabel: "This seems right",
                    voteNoAriaLabel: "This seems wrong",
                    voteYesTooltipMessage: "This seems right",
                    voteNoTooltipMessage: "This seems wrong",
                    voteYesMarginRight: 16,
                    voteNoMenuItems: t
                      ? void 0
                      : [
                          {
                            icon: o.createElement("div", {
                              className:
                                ni.emogenieReportItemEmotionVoteNoIncorrect,
                            }),
                            label: "Tone detected incorrectly",
                            onClick: () => {
                              s({
                                emotionName: e.name,
                                feedbackType: "EMOTION_INCORRECT",
                                skipSendingToCAPI: true,
                              });
                            },
                          },
                          {
                            icon: o.createElement("div", {
                              className:
                                ni.emogenieReportItemEmotionVoteNoOffensive,
                            }),
                            label: "Report offensive content",
                            onClick: () => {
                              s({
                                emotionName: e.name,
                                feedbackType: "EMOTION_OFFENSIVE",
                              });
                            },
                          },
                        ],
                    onVoteNoMenuToggle: (t) => {
                      t &&
                        s({
                          emotionName: e.name,
                          feedbackType: "EMOTION_DISLIKE",
                          skipTracking: true,
                        });
                    },
                    onVote: (i) => {
                      const a = t ? e.brandToneLabel || "neutral" : void 0;
                      i === zt.YES
                        ? s({
                            emotionName: e.name,
                            feedbackType: "EMOTION_LIKE",
                            brandTone: a,
                          })
                        : t &&
                          s({
                            emotionName: e.name,
                            feedbackType: "EMOTION_DISLIKE",
                            brandTone: a,
                          });
                    },
                    irrevocable: true,
                    voteValue:
                      i === Zt.b.dislike ||
                      i === Zt.b.incorrect ||
                      i === Zt.b.offensive
                        ? zt.NO
                        : i === Zt.b.like
                        ? zt.YES
                        : void (i !== Zt.b.none && (0, K.vE)(i)),
                  })
                ),
                t
                  ? o.createElement(
                      "div",
                      { className: ni.emogenieReportItemDescription },
                      e.brandToneDescription
                    )
                  : null
              )
        );
      };
      var li = i(31944),
        ci = i(24606),
        di = i(12266);
      const ui = ({
          emotions: e,
          emotionsPoll: t,
          showEmojiForDetectedTones: i,
          isBrandTonesEnabled: a,
          toneSuggestionInfo: s,
          onMount: r,
          onChangeShowEmojiForDetectedTones: n,
          onReportEmotionFeedback: l,
        }) => {
          let c, d;
          switch ((o.useEffect(r, []), true)) {
            case e.some(
              (e) =>
                e.brandToneLabel &&
                "off" === e.brandToneLabel &&
                e.confidence > 0.75
            ):
              c = "Your tone sounds off";
              break;
            case e.some((e) => e.brandToneLabel && "off" === e.brandToneLabel):
              c = "Something sounds slightly off...";
              break;
            case e.some((e) => e.brandToneLabel && "on" === e.brandToneLabel):
              c = a
                ? "You're on-brand! Great job!"
                : "Your writing sounds clear and aligned. Great job!";
              break;
            default:
              c = "How this may sound to readers:";
          }
          switch (true) {
            case a &&
              e.some((e) => e.brandToneLabel && "off" === e.brandToneLabel):
              d = o.createElement(
                "div",
                { className: di.emogenieReportHeaderBrandOffSubTitle },
                "Consider revising your message to align with your brand."
              );
              break;
            case a &&
              e.some((e) => e.brandToneLabel && "on" === e.brandToneLabel):
              d = "Read about the tones below to learn more.";
              break;
            case a:
              d =
                "Check your writing to see if the tone is what you had in mind.";
              break;
            default:
              d = null;
          }
          return o.createElement(
            "div",
            {
              className: di.emogenieReport,
              "data-grammarly-part": "emogenie-report",
            },
            o.createElement(
              "div",
              { className: di.emogenieReportHeader },
              o.createElement(
                "div",
                { className: di.emogenieReportHeaderTitle },
                c
              ),
              o.createElement(
                "div",
                { className: di.emogenieReportHeaderSubTitle },
                d
              )
            ),
            o.createElement(
              "div",
              { className: di.emogenieReportItems },
              e.map((e, i) =>
                o.createElement(oi, {
                  onReportEmotionFeedback: l,
                  key: e.name,
                  index: i,
                  emotion: e,
                  emotionPollValue: t[e.name] || Zt.b.none,
                  isBrandTonesEnabled: a,
                })
              )
            ),
            s ? o.createElement(pi, { ...s }) : null,
            !a &&
              o.createElement(
                li.J,
                {
                  onChange: n,
                  labelId:
                    "emogenie-report-always-show-emoji-for-detected-tones-checkbox",
                  checked: i,
                  className: di.emogenieReportCheckbox,
                  dataGrammarlyPart:
                    "emogenie-report-always-show-emoji-for-detected-tones-checkbox",
                },
                "Always show emoji for detected tones"
              )
          );
        },
        pi = ({
          onMount: e,
          emojiId: t,
          emojiLiteral: i,
          title: a,
          onClickCta: s,
          ctaText: r,
        }) => (
          o.useEffect(e, []),
          o.createElement(
            "div",
            { className: di.emogenieReportToneSuggestionInfo },
            o.createElement(
              "div",
              { className: di.emogenieReportToneSuggestionInfoEmojiAndTitle },
              t
                ? o.createElement(ii.dy, {
                    size: "small-medium",
                    unicodeHexArray: [t],
                    unicodeLiteral: null,
                    className: di.emogenieReportToneSuggestionInfoEmoji,
                  })
                : i
                ? o.createElement(ii.dy, {
                    size: "small-medium",
                    unicodeHexArray: null,
                    unicodeLiteral: i,
                    className: di.emogenieReportToneSuggestionInfoEmoji,
                  })
                : null,
              o.createElement("div", null, a)
            ),
            o.createElement(
              ci.z,
              {
                kind: "primary",
                onClick: s,
                className: di.emogenieReportToneSuggestionInfoButton,
                dataGrammarlyPart: "emogenie-report-tone-suggestion-info-cta",
              },
              r
            )
          )
        );
      var mi = i(93820);
      const hi = ({
        emogenieService: e,
        toneSuggestionInfo: t,
        onShowToneSuggestionInfo: i,
        onClickToneSuggestionInfoCta: a,
      }) =>
        o.createElement(
          xt.F.Fragment,
          null,
          le.h.combine(
            e.viewState,
            null != t ? t : le.h.create(void 0),
            (
              {
                report: t,
                emotionsPoll: s,
                settings: r,
                isBrandTonesEnabled: n,
              },
              l
            ) => {
              let c;
              return (
                l &&
                  ((c = {
                    title: l.title,
                    onMount() {
                      null == i || i(l);
                    },
                    onClickCta() {
                      null == a || a(l);
                    },
                    ctaText: "View suggestions",
                  }),
                  ue.isToneAISuggestionInfo(l)
                    ? (c = { ...c, emojiId: l.emojiId })
                    : ((c = { ...c, emojiLiteral: l.emojiLiteral }),
                      ue.isToneTransformSuggestionUphookInfo(l) &&
                        (c = {
                          ...c,
                          ctaText: o.createElement(
                            o.Fragment,
                            null,
                            o.createElement(mi.n, {
                              color: Kt.Z.neutral0,
                              width: 18,
                            }),
                            " Unlock Premium"
                          ),
                        }))),
                t &&
                  Array.isArray(t.emotions) &&
                  o.createElement(ui, {
                    emotions: t.emotions,
                    showEmojiForDetectedTones: r.showEmoji,
                    emotionsPoll: s,
                    isBrandTonesEnabled: n,
                    onMount: () => e.actions.trackReportShow(n),
                    onChangeShowEmojiForDetectedTones: (t) =>
                      e.actions.setShowEmojiState(t),
                    onReportEmotionFeedback: (t) =>
                      e.actions.reportEmotionFeedback(t),
                    toneSuggestionInfo: c,
                  })
              );
            }
          )
        );
      var gi = i(86705),
        vi = i(57556),
        fi = i(40145);
      const wi = o.lazy(() =>
          i
            .e(2826)
            .then(i.bind(i, 73684))
            .then(({ BrandTonesActivationUphookView: e }) => ({ default: e }))
        ),
        bi = o.forwardRef(({ emogenieService: e, viewModels: t }, i) => {
          const a = o.createElement(
            o.Fragment,
            null,
            o.createElement(Si, {
              isBrandTonesEnabled: e.viewState.view("isBrandTonesEnabled"),
              institutionLogo: e.viewState
                .view("report")
                .view((e) => (null == e ? void 0 : e.institutionLogo)),
              institutionName: e.viewState.view("institutionName"),
              browser: t.assistantLayoutViewModel.browser,
            }),
            o.createElement(hi, { emogenieService: e }),
            o.createElement(
              xt.F.Fragment,
              null,
              e.viewState.view(
                (t) =>
                  !t.isBrandTonesEnabled &&
                  !t.settings.hideBrandTonesActivationUphook &&
                  t.settings.shouldShowBrandTonesActivationUphook &&
                  o.createElement(
                    o.Suspense,
                    { fallback: o.createElement(o.Fragment, null) },
                    o.createElement(
                      qt.L,
                      { chunkName: "brandTonesActivationUphook" },
                      o.createElement(wi, {
                        trackShow: e.actions.trackBrandToneActivationUphookShow,
                        onActivateClick:
                          e.actions.brandToneActivationUphookCTAClick,
                        onDismissClick:
                          e.actions.brandToneActivationUphookDismissClick,
                      })
                    )
                  )
              )
            )
          );
          return o.createElement(
            Gt,
            {
              dataPartName: "emogenie-view-overlay",
              layoutVM: t.assistantLayoutViewModel,
              panelClassName: Wt.gradientViewOverlayPanel,
              hideBackButton: t.user.view((e) => e.isAnonymous),
            },
            o.createElement(
              xt.F.Fragment,
              null,
              t.lensPreviewViewModel
                .getLens(Te.R.SpecialId.PredictionEmogenie)
                .pipe(
                  oe.U((e) => e.count > 0),
                  it.x(),
                  oe.U((e) =>
                    e
                      ? o.createElement(Ht, {
                          key: "emogeniePredictionCardList",
                          viewModels: t,
                          ref: i,
                          header: o.createElement(
                            o.Fragment,
                            null,
                            a,
                            o.createElement(
                              "div",
                              { className: fi.relatedSuggestionsTitle },
                              "RELATED SUGGESTIONS"
                            )
                          ),
                        })
                      : o.createElement(
                          "div",
                          { className: Wt.gradientViewOverlayContent },
                          a
                        )
                  )
                )
            )
          );
        }),
        Si = ({
          isBrandTonesEnabled: e,
          institutionLogo: t,
          institutionName: i,
          browser: a,
        }) =>
          o.createElement(
            xt.F.Fragment,
            null,
            le.h.combine(e, t, i, (e, t, i) =>
              o.createElement(
                "div",
                { className: Wt.defaultViewOverlayHeader },
                o.createElement(
                  "div",
                  { className: vi.emogenieViewOverlayHeader },
                  e
                    ? o.createElement(
                        "div",
                        null,
                        t
                          ? o.createElement("img", {
                              className: Wt.logo,
                              src: t,
                            })
                          : null,
                        i,
                        " Tone detector"
                      )
                    : "Tone detector",
                  o.createElement(gi.v, {
                    browser: a,
                    className: vi.emogenieViewOverlayHeaderBetaBadge,
                  })
                )
              )
            )
          );
      var yi = i(53844);
      const _i = ({ feedbackVM: e, layoutVM: t }) =>
        o.createElement(
          Gt,
          {
            dataPartName: "feedback-view-overlay",
            layoutVM: t,
            panelClassName: Wt.gradientViewOverlayPanel,
          },
          o.createElement(
            "div",
            { className: Wt.gradientViewOverlayContent },
            o.createElement(
              "div",
              { className: Wt.defaultViewOverlayHeader },
              "Product Feedback"
            ),
            o.createElement(yi.q5, {
              domain: e.getDomain(),
              onClose: () => t.popActiveView(),
              align: "left",
              style: { height: "calc(100% - 48px)" },
              onSubmit: (t) => e.submitFeedback(t),
              withScore: true,
              fixSubmitButtonOverflowBottomPadding: true,
              hideLogo: true,
            })
          )
        );
      var ki = i(22667),
        Ai = i(57398);
      const Ci = o.memo(
        ({
          width: e,
          strokeWidth: t,
          generalScore: i,
          componentStyle: a,
          fontSize: s = 9,
          isLoading: r,
        }) => {
          const n = e / 2,
            l = n - t / 2,
            c = 2 * l * Math.PI,
            d = ((r ? 75 : i) / 100) * c,
            u = c - d,
            p = ((e) => {
              const { red40: t, yellow50: i, green50: a } = Kt.Z;
              return e < 65 ? t : e < 95 ? i : a;
            })(i);
          return o.createElement(
            "div",
            { ...(0, Rt.Sh)(Ai.scoreRing, r && Ai.loading), style: a },
            o.createElement(
              "svg",
              { width: e, height: e, viewBox: `0 0 ${e} ${e}` },
              o.createElement("circle", { fill: "white", r: l, cx: n, cy: n }),
              o.createElement("circle", {
                stroke: Kt.Z.neutral20,
                fill: "transparent",
                strokeWidth: t,
                style: { strokeDashoffset: d },
                r: l,
                cx: n,
                cy: n,
              }),
              o.createElement("circle", {
                stroke: p,
                fill: "transparent",
                strokeWidth: t,
                strokeDasharray: `${c} ${c}`,
                style: { strokeDashoffset: u },
                r: l,
                cx: n,
                cy: n,
              }),
              o.createElement(
                "text",
                {
                  className: Ai.scoreText,
                  x: "50%",
                  y: "-35%",
                  fontSize: s,
                  fill: "black",
                  textAnchor: "middle",
                  transform: "rotate(90)",
                },
                i > 0 && !r ? i : ""
              )
            )
          );
        }
      );
      var Ei = i(93756),
        Ii = i(78846);
      const Mi = (e) => {
          const t = Lt.Z.animatingFlow(() => e.headerVM.logoScore, Ti);
          return o.createElement(
            "div",
            { className: Ii.logo_score },
            Lt.UI.mount(Pi, t)
          );
        },
        Ti = (e, t) =>
          (0, n.pipe)(
            e,
            v.filter((e) => e.type !== t.type),
            v.map(() => Ei.Hk("fadeout", "fadein"))
          ),
        xi = Lt.UI.Node.make(() =>
          o.createElement(ki.K, { className: Ii.grammarly_logo, size: 22 })
        ),
        Ri = Lt.UI.Node.make(({ view: e }) =>
          o.createElement(
            xt.F.div,
            {
              className: Ii.score_container,
              "data-grammarly-part": "assistant-score",
            },
            (0, n.pipe)(
              e("score"),
              (0, oe.U)(({ capiScore: e, isLoading: t }) =>
                o.createElement(
                  o.Fragment,
                  null,
                  o.createElement(Ci, {
                    generalScore: e,
                    strokeWidth: 2,
                    width: 22,
                    fontSize: e < 100 ? 11 : 9,
                    isLoading: t,
                    componentStyle: {
                      transform: "translate(2px, -2px) rotate(-90deg)",
                      cursor: "default",
                    },
                  })
                )
              )
            )
          )
        ),
        Li = Lt.UI.Union.make("type", { logo: xi, score: Ri }),
        Fi = Lt.UI.Transition.make(
          { fadein: Ii.logoscore_fadein },
          { fadeout: Ii.logoscore_fadeout }
        ),
        Pi = Lt.UI.Animated.make(Fi, Li);
      var Vi = i(22679),
        Bi = i(1620),
        Oi = i(75100),
        Ni = i.n(Oi);
      const Di = ({ enableTooltip: e = false, size: t = "medium", ...i }) =>
          o.createElement(
            Xt.u,
            { message: "Settings", showDelay: Vi.gk, disabled: !e },
            o.createElement(
              Qt.h,
              { ...i },
              o.createElement("div", {
                ...(0, Rt.Sh)(
                  "small" === t ? Ni().settingsButtonSmallIcon : null,
                  "medium" === t ? Ni().settingsButtonMediumIcon : null
                ),
              })
            )
          ),
        Ui = (e) => {
          const [t, i] = o.useState(false),
            [a, s] = o.useState(false),
            r = e.viewModels.assistantLayoutViewModel,
            l = e.viewModels.assistantHeaderViewModel,
            c = o.useContext(gt.Context),
            d = (0, n.pipe)(
              e.viewModels.assistantProofitViewModel,
              v.map((e) => e.feature),
              v.map((e) =>
                o.createElement(
                  xt.F.Fragment,
                  null,
                  ht
                    .aj([
                      e.layoutCreated,
                      r.activeView.view(
                        (t) => t.type === e.assistantViewType()
                      ),
                    ])
                    .pipe(
                      oe.U(([t, i]) =>
                        t
                          ? o.createElement(
                              Xt.u,
                              {
                                message: c.proofitTooltip,
                                showDelay: Vi.gk,
                                disabled: i,
                              },
                              o.createElement(
                                Qt.h,
                                {
                                  onClick: () =>
                                    i
                                      ? r.popActiveView()
                                      : r.pushActiveView({
                                          type: e.assistantViewType(),
                                        }),
                                  dataGrammarlyPart:
                                    "assistant-header-action-btn-proofit",
                                },
                                o.createElement("div", {
                                  className: Ii.headerActionBtnProofitIcon,
                                })
                              )
                            )
                          : null
                      )
                    )
                )
              ),
              v.toNullable
            ),
            u = o.createElement(Bi.P, {
              onClick: l.close,
              tooltipMessage: "Close panel",
              dataGrammarlyPart: "assistant-header-action-btn-close",
            });
          return o.createElement(
            Xt.u,
            {
              message: "Grab and drag to move panel",
              showDelay: Vi.gk,
              disabled: t,
            },
            o.createElement(
              "div",
              {
                ...(0, Rt.Sh)(Ii.header, a && Ii.actions_hovered),
                ref: e.draggableRef,
                onMouseDown: () => i(true),
                onMouseOut: () => i(false),
              },
              o.createElement(Mi, { headerVM: l }),
              o.createElement(Hi, null),
              o.createElement(
                xt.F.div,
                {
                  className: Ii.headerActions,
                  onMouseOver: () => s(true),
                  onMouseOut: () => s(false),
                },
                r.isHeaderNavigationEnabled.view((e) =>
                  e
                    ? o.createElement(
                        o.Fragment,
                        null,
                        d,
                        o.createElement(
                          xt.F.Fragment,
                          null,
                          l.showSetGoalsActionButton.view(
                            (e) =>
                              e &&
                              o.createElement(
                                Xt.u,
                                {
                                  message: c.setGoalsTooltip,
                                  showDelay: Vi.gk,
                                },
                                o.createElement(
                                  Qt.h,
                                  {
                                    onClick: () => l.open("setGoals"),
                                    dataGrammarlyPart:
                                      "assistant-header-action-btn-set-goals",
                                  },
                                  o.createElement("div", {
                                    className: Ii.headerActionBtnGoalsIcon,
                                  })
                                )
                              )
                          )
                        ),
                        o.createElement(
                          xt.F.Fragment,
                          null,
                          le.h.combine(
                            l.showSettingsActionButton,
                            r.activeView,
                            (e, t) => {
                              const i = t.type === m.aH.Type.settings;
                              return (
                                e &&
                                o.createElement(Di, {
                                  onClick: () =>
                                    i
                                      ? r.popActiveView()
                                      : r.pushActiveView({
                                          type: m.aH.Type.settings,
                                        }),
                                  enableTooltip: !i,
                                  dataGrammarlyPart:
                                    "assistant-header-action-btn-settings",
                                })
                              );
                            }
                          )
                        ),
                        u
                      )
                    : u
                )
              )
            )
          );
        },
        Hi = () =>
          o.createElement(
            "div",
            {
              className: Ii.draggableWrapper,
              "data-grammarly-part": "assistant-draggable-handler",
            },
            o.createElement("div", { className: Ii.draggable })
          ),
        ji = () => null;
      var Wi = i(55364);
      const Gi = ({ layoutVM: e, onClickBack: t, children: i }) => {
        const [a, s] = o.useState(false);
        return o.createElement(
          Gt,
          {
            dataPartName: "proofit-view-overlay",
            layoutVM: e,
            panelClassName: Wi.proofitViewOverlayPanel,
            onClickBack: t,
          },
          o.createElement(
            "div",
            {
              className: Wi.proofitViewOverlayContent,
              tabIndex: -1,
              ref: (e) => {
                null === e || a || (e.focus(), s(true));
              },
            },
            o.createElement(
              "div",
              { className: Wt.defaultViewOverlayHeader },
              o.createElement(
                "div",
                { className: Wi.proofitViewOverlayHeader },
                "Expert Writing Help",
                o.createElement(gi.v, {
                  browser: e.browser,
                  className: Wi.proofitViewOverlayHeaderBetaBadge,
                })
              )
            ),
            i
          )
        );
      };
      var zi = i(10247),
        qi = i(2027),
        Ki = i(81108);
      var Zi = i(59e3),
        Xi = i(41063),
        Yi = i(17487);
      const Qi = ({ turnaroundTime: e }) =>
          o.createElement(
            "div",
            { className: Xi.proofitHowItWorksSteps },
            o.createElement(
              "div",
              {
                ...(0, Rt.Sh)(
                  Xi.proofitHowItWorksStep,
                  Xi.proofitHowItWorksStepOne
                ),
              },
              "Your draft will be minimized and shared with writing experts.",
              o.createElement(
                "div",
                {
                  ...(0, Rt.Sh)(
                    Xi.proofitHowItWorksStepNumberContainer,
                    Xi.proofitHowItWorksStepOneNumberContainer
                  ),
                },
                o.createElement(
                  "div",
                  {
                    ...(0, Rt.Sh)(
                      Xi.proofitHowItWorksStepNumber,
                      Xi.proofitHowItWorksStepOneNumber
                    ),
                  },
                  "1"
                )
              )
            ),
            o.createElement(
              "div",
              {
                ...(0, Rt.Sh)(
                  Xi.proofitHowItWorksStep,
                  Xi.proofitHowItWorksStepTwo
                ),
              },
              "You will see progress indication. The average turnaround is ",
              e,
              " seconds.",
              o.createElement(
                "div",
                {
                  ...(0, Rt.Sh)(
                    Xi.proofitHowItWorksStepNumberContainer,
                    Xi.proofitHowItWorksStepTwoNumberContainer
                  ),
                },
                o.createElement(
                  "div",
                  {
                    ...(0, Rt.Sh)(
                      Xi.proofitHowItWorksStepNumber,
                      Xi.proofitHowItWorksStepTwoNumber
                    ),
                  },
                  "2"
                )
              )
            ),
            o.createElement(
              "div",
              {
                ...(0, Rt.Sh)(
                  Xi.proofitHowItWorksStep,
                  Xi.proofitHowItWorksStepThree
                ),
              },
              "Your draft will re-open with revisions highlighted.",
              o.createElement(
                "div",
                {
                  ...(0, Rt.Sh)(
                    Xi.proofitHowItWorksStepNumberContainer,
                    Xi.proofitHowItWorksStepThreeNumberContainer
                  ),
                },
                o.createElement(
                  "div",
                  {
                    ...(0, Rt.Sh)(
                      Xi.proofitHowItWorksStepNumber,
                      Xi.proofitHowItWorksStepThreeNumber
                    ),
                  },
                  "3"
                )
              )
            )
          ),
        $i = ({
          turnaroundTime: e,
          freeTrialQuota: t,
          onSubmit: i,
          disabledInfo: a = null,
          isLoading: s = false,
          style: r,
          onTogglePrivacyInfo: n,
          showPrivacyInfo: l,
          disableHowItWorksInfo: c = false,
          onDisableHowItWorksInfo: d,
          showHowItWorksInfo: u,
          onShowHowItWorksInfo: p,
        }) => {
          const [m, h] = o.useState(null != l && l),
            [g, v] = o.useState(null != u && u),
            f = t > 0 ? t : 0;
          var w, b;
          o.useEffect(() => {
            null == n || n(m);
          }, [m]),
            o.useEffect(() => {
              h(null != l && l);
            }, [l]),
            o.useEffect(() => {
              v(null != u && u);
            }, [u]),
            (w = () => (null == p ? void 0 : p())),
            (b = g),
            o.useEffect(() => {
              b && w();
            }, [b]);
          const S = o.useCallback(() => {
            c || g ? i() : v(true);
          }, [c, g, i]);
          return o.createElement(
            "div",
            {
              "data-grammarly-part": "proofit-request-form",
              style: { width: "100%", height: "100%", ...r },
            },
            o.createElement(
              "div",
              { className: Yi.proofitRequestForm },
              m
                ? o.createElement(
                    o.Fragment,
                    null,
                    o.createElement(
                      "div",
                      { className: Yi.proofitRequestFormPrivacyInfoTitle },
                      "How we protect you"
                    ),
                    o.createElement(
                      "div",
                      {
                        className: Yi.proofitRequestFormPrivacyInfoDescription,
                      },
                      o.createElement(
                        "div",
                        {
                          className:
                            Yi.proofitRequestFormPrivacyInfoDescriptionItem,
                        },
                        o.createElement("div", {
                          className:
                            Yi.proofitRequestFormPrivacyInfoDescriptionItemBulletPoint,
                        }),
                        o.createElement(
                          "div",
                          {
                            className:
                              Yi.proofitRequestFormPrivacyInfoDescriptionItemText,
                          },
                          "Our writing experts will see only your current email draft—no prior messages or contact details."
                        )
                      ),
                      o.createElement(
                        "div",
                        {
                          className:
                            Yi.proofitRequestFormPrivacyInfoDescriptionItem,
                        },
                        o.createElement("div", {
                          className:
                            Yi.proofitRequestFormPrivacyInfoDescriptionItemBulletPoint,
                        }),
                        o.createElement(
                          "div",
                          {
                            className:
                              Yi.proofitRequestFormPrivacyInfoDescriptionItemText,
                          },
                          "We will not sell, rent, or make public any of your personal data."
                        )
                      )
                    ),
                    o.createElement(
                      ci.z,
                      { kind: "outlined", onClick: () => h(false) },
                      "Continue"
                    )
                  )
                : o.createElement(
                    o.Fragment,
                    null,
                    g
                      ? o.createElement(Qi, { turnaroundTime: e })
                      : o.createElement(
                          o.Fragment,
                          null,
                          o.createElement("div", {
                            className: Yi.proofitRequestFormImg,
                          }),
                          o.createElement(
                            "div",
                            { className: Yi.proofitRequestFormTitle },
                            "Get instant writing help"
                          ),
                          o.createElement(
                            "div",
                            { className: Yi.proofitRequestFormDescription },
                            "Our writing experts are standing by to review your email."
                          ),
                          o.createElement(
                            "div",
                            { className: Yi.proofitRequestFormCostAndTime },
                            o.createElement(
                              "div",
                              { className: Yi.proofitRequestFormCost },
                              o.createElement(
                                "div",
                                {
                                  className:
                                    Yi.proofitRequestFormCostAndTimeTitle,
                                },
                                f,
                                " free ",
                                y._6(f, "review", "reviews")
                              ),
                              o.createElement(
                                "div",
                                {
                                  className:
                                    Yi.proofitRequestFormCostAndTimeSubtitle,
                                },
                                "left this month",
                                o.createElement("sup", null, "*")
                              )
                            ),
                            o.createElement(
                              "div",
                              { className: Yi.proofitRequestFormTime },
                              o.createElement(
                                "div",
                                {
                                  className:
                                    Yi.proofitRequestFormCostAndTimeTitle,
                                },
                                e,
                                " seconds"
                              ),
                              o.createElement(
                                "div",
                                {
                                  className:
                                    Yi.proofitRequestFormCostAndTimeSubtitle,
                                },
                                "average turnaround"
                              )
                            )
                          )
                        ),
                    o.createElement(
                      ci.z,
                      {
                        kind: "primary",
                        className: Yi.proofitRequestFormRequestBtn,
                        disabled: Boolean(a || s),
                        onClick: S,
                      },
                      s
                        ? o.createElement("div", {
                            className: Zi.proofitRequestFormBtnLoadingSpinner,
                          })
                        : c || g
                        ? "Start review"
                        : "Request now"
                    ),
                    a || s
                      ? a
                        ? o.createElement(
                            "div",
                            { className: Yi.proofitRequestFormUnavailableMsg },
                            o.createElement(Ki.Q, { info: a })
                          )
                        : null
                      : o.createElement(
                          ci.z,
                          { kind: "link", onClick: () => h(true) },
                          "Learn how we protect your privacy"
                        ),
                    o.createElement(
                      "div",
                      {
                        ...(0, Rt.Sh)(
                          Yi.proofitRequestFormFootnote,
                          g
                            ? Yi.proofitRequestFormFootnoteHowItWorksDontShowAgainCheckbox
                            : Yi.proofitRequestFormFootnoteFreeTrial
                        ),
                      },
                      g
                        ? o.createElement(
                            li.J,
                            {
                              labelId:
                                "proofit-request-form-how-it-works-dont-show-again",
                              onChange: d,
                            },
                            "Don't show this again"
                          )
                        : o.createElement(
                            "span",
                            null,
                            o.createElement("sup", null, "*"),
                            " included with your Premium subscription"
                          )
                    )
                  )
            )
          );
        },
        Ji = ({ layoutVM: e, proofitVM: t }) => {
          const i = (0, qi.fW)(),
            [a, s] = o.useState(false),
            [r, n] = o.useState(false);
          return o.createElement(
            Gi,
            {
              layoutVM: e,
              onClickBack: () => {
                a ? s(false) : r ? n(false) : e.popActiveView();
              },
            },
            o.createElement(
              xt.F.Fragment,
              null,
              (0, ht.aj)([
                t.feature.layoutCreated,
                t.feature.requestInfo,
                t.feature.turnaroundTime,
                t.feature.quotaRemaining,
                t.feature.requestDisabledInfo,
                t.feature.disableHowItWorksInfo,
              ]).pipe(
                (0, oe.U)(([e, l, c, d, u, p]) =>
                  e && l.status !== zi.eE.REVIEWING
                    ? o.createElement($i, {
                        turnaroundTime: c,
                        freeTrialQuota: d,
                        onSubmit: () => t.onSubmitRequest(i),
                        style: { height: "calc(100% - 48px)" },
                        disabledInfo: u,
                        isLoading:
                          l.status === zi.eE.PREPARING ||
                          l.status === zi.eE.PRE_SUBMIT,
                        showPrivacyInfo: a,
                        onTogglePrivacyInfo: s,
                        disableHowItWorksInfo: p,
                        onDisableHowItWorksInfo: (e) =>
                          t.feature.onDisableHowItWorksInfo(e),
                        showHowItWorksInfo: r,
                        onShowHowItWorksInfo: () => n(true),
                      })
                    : null
                )
              )
            )
          );
        };
      var ea = i(8400);
      const ta = ({
          suggestionsMade: e,
          onAccept: t,
          onFeedbackFormSubmitted: i,
        }) =>
          o.createElement(
            "div",
            {
              className: ea.proofitReviewForm,
              "data-grammarly-part": "proofit-review-form",
            },
            o.createElement(
              "div",
              { className: ea.proofitReviewFormTitle },
              "Our experts made ",
              e,
              " ",
              y._6(e, "suggestion", "suggestions")
            ),
            o.createElement(
              "div",
              { className: ea.proofitReviewFormDescription },
              "Are you satisfied with the suggestions that our experts provided?"
            ),
            o.createElement(
              "div",
              { className: ea.proofitFeedbackForm },
              o.createElement(yi.q5, {
                hideLogo: true,
                hideTitle: true,
                hideTextBoxTitle: true,
                withScore: true,
                placeholderText: "How can we improve?",
                onSubmit: i,
                showPostSubmitScreen: false,
              })
            ),
            o.createElement(
              "div",
              { className: ea.proofitDoneButton },
              o.createElement(ci.z, { kind: "link", onClick: t }, "Done")
            )
          ),
        ia = ({ layoutVM: e, proofitVM: t }) => {
          const i = (0, qi.fW)();
          return o.createElement(
            Gi,
            { layoutVM: e },
            o.createElement(
              xt.F.Fragment,
              null,
              (0, ht.aj)([t.feature.layoutCreated, t.feature.requestInfo]).pipe(
                (0, oe.U)(([e, a]) =>
                  e && a.status === zi.eE.REVIEWING
                    ? o.createElement(ta, {
                        suggestionsMade: a.suggestionsMade,
                        onAccept: () => t.onCompleteRequest(i),
                        onFeedbackFormSubmitted: (e) => {
                          t.onSubmitFeedback(e), t.onCompleteRequest(i);
                        },
                      })
                    : null
                )
              )
            )
          );
        };
      class aa extends o.Component {
        render() {
          return (
            (this._idSuffix =
              this._idSuffix ||
              "readersAttentionOnboardingBanner_" + aa._nextIdSuffix++),
            o.createElement(
              "svg",
              {
                className: this.props.className,
                viewBox: "0 2 296 144",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              o.createElement(
                "g",
                { clipPath: `url(#clip0_${this._idSuffix})` },
                o.createElement("rect", {
                  width: "296",
                  height: "144",
                  fill: "#4A6EE0",
                }),
                o.createElement("path", {
                  d: "M-5.5 -3.5H261.5V47.5H-5.5V-3.5Z",
                  fill: "#6E66DE",
                  stroke: "#1F243C",
                }),
                o.createElement("path", {
                  d: "M-2.79293 -197.5L429.5 234.793V-197.5H-2.79293Z",
                  fill: "#15C39A",
                  stroke: "#1F243C",
                }),
                o.createElement("path", {
                  d: "M219.057 33C222.992 33 226.182 29.8101 226.182 25.875C226.182 21.94 222.992 18.7501 219.057 18.7501C215.122 18.7501 211.932 21.94 211.932 25.875C211.932 29.8101 215.122 33 219.057 33Z",
                  fill: "#1F243C",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M221.477 31.0899C225.92 31.0899 229.522 27.4881 229.522 23.045C229.522 18.6018 225.92 15 221.477 15C217.033 15 213.432 18.6018 213.432 23.045C213.432 27.4881 217.033 31.0899 221.477 31.0899Z",
                  fill: "#41D9B5",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M220.188 27.045C220.009 27.045 219.841 26.9778 219.717 26.8434L216.927 24.0646C216.67 23.8069 216.67 23.3811 216.927 23.1122C217.185 22.8545 217.611 22.8545 217.88 23.1122L220.188 25.4204L225.353 20.2662C225.611 20.0085 226.037 20.0085 226.306 20.2662C226.563 20.5239 226.563 20.9497 226.306 21.2186L220.67 26.8546C220.535 26.9778 220.367 27.045 220.188 27.045Z",
                  fill: "white",
                }),
                o.createElement("path", {
                  d: "M68.125 57C72.06 57 75.25 53.8101 75.25 49.875C75.25 45.94 72.06 42.7501 68.125 42.7501C64.19 42.7501 61 45.94 61 49.875C61 53.8101 64.19 57 68.125 57Z",
                  fill: "#1F243C",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M70.545 55.0899C74.9881 55.0899 78.5899 51.4881 78.5899 47.045C78.5899 42.6018 74.9881 39 70.545 39C66.1018 39 62.5 42.6018 62.5 47.045C62.5 51.4881 66.1018 55.0899 70.545 55.0899Z",
                  fill: "#41D9B5",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M69.2564 51.045C69.0771 51.045 68.909 50.9778 68.7858 50.8434L65.9958 48.0646C65.7381 47.8069 65.7381 47.3811 65.9958 47.1122C66.2535 46.8545 66.6793 46.8545 66.9482 47.1122L69.2564 49.4204L74.4217 44.2662C74.6794 44.0085 75.1052 44.0085 75.3741 44.2662C75.6318 44.5239 75.6318 44.9497 75.3741 45.2186L69.7382 50.8546C69.6037 50.9778 69.4357 51.045 69.2564 51.045Z",
                  fill: "white",
                }),
                o.createElement("rect", {
                  x: "132",
                  y: "38",
                  width: "39",
                  height: "24",
                  rx: "2",
                  fill: "#1F243C",
                  stroke: "#1F243C",
                }),
                o.createElement("rect", {
                  x: "135",
                  y: "35",
                  width: "39",
                  height: "24",
                  rx: "2",
                  fill: "#F8C6DA",
                  stroke: "#1F243C",
                }),
                o.createElement("path", {
                  d: "M135 58.3296L149.303 47.4857L153.298 44.4591C154.007 43.923 154.993 43.923 155.702 44.4591L159.697 47.4857L174 58.3296",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M173.914 35.5L159.698 47.6583L155.806 50.9962C155.063 51.6361 153.956 51.6361 153.212 50.9962L149.303 47.6583L135.087 35.5",
                  fill: "#F8C6DA",
                }),
                o.createElement("path", {
                  d: "M173.914 35.5L159.698 47.6583L155.806 50.9962C155.063 51.6361 153.956 51.6361 153.212 50.9962L149.303 47.6583L135.087 35.5",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("rect", {
                  x: "135",
                  y: "35",
                  width: "39",
                  height: "24",
                  rx: "2",
                  stroke: "#1F243C",
                }),
                o.createElement("rect", {
                  y: "32",
                  width: "296",
                  height: "112",
                  fill: `url(#paint0_linear_${this._idSuffix})`,
                }),
                o.createElement("path", {
                  d: "M185.5 22C185.5 18.961 183.039 16.5 180 16.5C183.039 16.5 185.5 14.039 185.5 11C185.5 14.039 187.961 16.5 191 16.5C187.965 16.5 185.5 18.9651 185.5 22Z",
                  fill: "#F9EA9E",
                  stroke: "#1F243C",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }),
                o.createElement("path", {
                  d: "M239.5 128C239.5 124.961 237.039 122.5 234 122.5C237.039 122.5 239.5 120.039 239.5 117C239.5 120.039 241.961 122.5 245 122.5C241.965 122.5 239.5 124.965 239.5 128Z",
                  fill: "#F9EA9E",
                  stroke: "#1F243C",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }),
                o.createElement("path", {
                  d: "M24.5 63C24.5 59.961 22.039 57.5 19 57.5C22.039 57.5 24.5 55.039 24.5 52C24.5 55.039 26.961 57.5 30 57.5C26.9651 57.5 24.5 59.9651 24.5 63Z",
                  fill: "#F9EA9E",
                  stroke: "#1F243C",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }),
                o.createElement("rect", {
                  x: "263",
                  y: "76",
                  width: "63",
                  height: "77",
                  rx: "2",
                  fill: "#1F243C",
                  stroke: "#1F243C",
                }),
                o.createElement("rect", {
                  x: "267",
                  y: "72",
                  width: "63",
                  height: "77",
                  rx: "2",
                  fill: "#F9FAFF",
                  stroke: "#1F243C",
                }),
                o.createElement("path", {
                  d: "M318.759 89.7112H278",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M318.759 101.227H278",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M318.759 112.743H278.095",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement("path", {
                  d: "M318.759 124.259H278",
                  stroke: "#1F243C",
                  strokeMiterlimit: "10",
                }),
                o.createElement(
                  "g",
                  { style: { mixBlendMode: "multiply" }, opacity: "0.4" },
                  o.createElement("path", {
                    d: "M318.759 101.227H278",
                    stroke: "#41D9B5",
                    strokeWidth: "10",
                    strokeMiterlimit: "10",
                  })
                ),
                o.createElement(
                  "g",
                  { style: { mixBlendMode: "multiply" }, opacity: "0.4" },
                  o.createElement("path", {
                    d: "M305.43 112.743H278.095",
                    stroke: "#41D9B5",
                    strokeWidth: "10",
                    strokeMiterlimit: "10",
                  })
                )
              ),
              o.createElement(
                "defs",
                null,
                o.createElement(
                  "linearGradient",
                  {
                    id: `paint0_linear_${this._idSuffix}`,
                    x1: "148",
                    y1: "32",
                    x2: "148",
                    y2: "144",
                    gradientUnits: "userSpaceOnUse",
                  },
                  o.createElement("stop", {
                    stopColor: "#26307D",
                    stopOpacity: "0",
                  }),
                  o.createElement("stop", {
                    offset: "1",
                    stopColor: "#26307D",
                    stopOpacity: "0.5",
                  })
                ),
                o.createElement(
                  "clipPath",
                  { id: `clip0_${this._idSuffix}` },
                  o.createElement("rect", {
                    width: "296",
                    height: "144",
                    fill: "white",
                  })
                )
              )
            )
          );
        }
      }
      aa._nextIdSuffix = 0;
      var sa = i(44715);
      const ra = ({ layoutVM: e }) =>
        o.createElement(
          Gt,
          {
            dataPartName: "readers-attention-help-overlay",
            layoutVM: e,
            panelClassName: sa.helpPanel,
            contentClassName: sa.helpPanelContent,
          },
          o.createElement(
            "div",
            { className: sa.helpBanner },
            o.createElement(aa, { className: sa.helpBannerImage }),
            o.createElement(
              "div",
              { className: sa.helpHeader },
              "Reader′s attention",
              o.createElement(Yt.C, { title: "NEW", kind: "gold" })
            ),
            o.createElement(
              "div",
              { className: sa.helpBannerMessage },
              "Get your important information across"
            )
          ),
          o.createElement(
            "div",
            { className: sa.helpContent },
            o.createElement(
              "div",
              null,
              "Grammarly predicts which parts of your email will be read.",
              o.createElement(
                "ul",
                null,
                o.createElement(
                  "li",
                  null,
                  o.createElement(
                    "span",
                    { className: sa.heatmap },
                    o.createElement(
                      "b",
                      null,
                      "Highlighted text is most likely to be read."
                    )
                  )
                ),
                o.createElement(
                  "li",
                  null,
                  "The rest of the text may be skimmed or skipped."
                )
              ),
              "Follow Grammarly’s suggestions to keep your reader’s attention."
            )
          )
        );
      var na = i(47960),
        oa = i(90282);
      const la = ({ feedbackVM: e, entryPoint: t }) =>
        o.createElement(
          Xt.u,
          { showDelay: Vi.gk, message: "Leave feedback" },
          o.createElement(
            "div",
            {
              className: oa.feedbackButton,
              onClick: () => e.openFeedback(t),
              "data-grammarly-part": "assistant-feedback-btn",
            },
            o.createElement(na.A, { color: Kt.Z.blue50 }),
            "Anything we can improve?"
          )
        );
      var ca = i(35327);
      const da = (e) => {
          const t = Lt.Z.animatingFlow(() => e.summaryVM.summary, ua);
          return o.createElement(
            "div",
            { ...(0, Rt.Sh)(ca.summary_wrapper, e.className) },
            Lt.UI.mount(ha, t)
          );
        },
        ua = (e, t) =>
          (0, n.pipe)(
            e,
            v.filter((e) => e.content !== t.content),
            v.map(() => Ei.Hk("fadeout", "fadein"))
          ),
        pa = Lt.UI.Node.make(({ view: e }) =>
          o.createElement(
            xt.F.div,
            {
              className: ca.summary_heading,
              "data-grammarly-part": "assistant-summary-header",
            },
            e("content")
          )
        ),
        ma = Lt.UI.Transition.make(
          { fadein: ca.summary_fadein },
          { fadeout: ca.summary_fadeout }
        ),
        ha = Lt.UI.Animated.make(ma, pa);
      var ga = i(35501),
        va = i(61922),
        fa = i(82318);
      const wa = o.forwardRef(({ viewModels: e, readersAttentionVM: t }, i) =>
          o.createElement(
            Gt,
            {
              dataPartName: "readers-attention-view-overlay",
              layoutVM: e.assistantLayoutViewModel,
              panelClassName: Wt.gradientViewOverlayPanel,
            },
            o.createElement(Ht, {
              key: "takeawaysPredictionCardList",
              ref: i,
              viewModels: e,
              className: fa.cardList,
              header: o.createElement(ba, {
                readersAttentionVM: t,
                layoutVM: e.assistantLayoutViewModel,
              }),
              footer: o.createElement(la, {
                feedbackVM: e.assistantFeedbackViewModel,
                entryPoint: L.Q.readersAttention,
              }),
            })
          )
        ),
        ba = ({ readersAttentionVM: e, layoutVM: t }) => {
          const i = e.panelState.pipe(
            oe.U(
              v.fold(
                () => ({ content: "" }),
                (e) => ({ content: e.headerMessage })
              )
            )
          );
          return o.createElement(
            o.Fragment,
            null,
            o.createElement(
              "div",
              { className: Wt.defaultViewOverlayHeader },
              o.createElement(
                "div",
                { className: fa.headerGroup },
                "Reader′s attention",
                o.createElement(
                  "div",
                  {
                    onClick: () => e.showHelp(),
                    className: fa.questionMarkButton,
                    "data-grammarly-part":
                      "readers-attention-question-mark-button",
                  },
                  o.createElement(va.JO.QuestionMark, {
                    width: 12,
                    className: fa.questionMarkIcon,
                  })
                )
              ),
              o.createElement(gi.v, { browser: t.browser })
            ),
            o.createElement(da, {
              summaryVM: { summary: i },
              className: fa.summaryWrapper,
            }),
            o.createElement(
              "div",
              { className: fa.message },
              mt.UI.mount(mt.UI.Union.asOption(ga.r), () => e.panelState)
            ),
            o.createElement(
              xt.F.div,
              {
                ...(0, Rt.Sh)(
                  fi.relatedSuggestionsTitle,
                  fa.relatedSuggestionsTitle
                ),
              },
              e.panelState.pipe(
                oe.U(
                  v.fold(
                    h.gn,
                    (e) =>
                      `${e.numChecklistItemsChecked} OF ${e.numChecklistItems} COMPLETED`
                  )
                )
              )
            )
          );
        };
      var Sa = i(19106),
        ya = i(17324),
        _a = i(99446);
      const ka = () =>
        o.createElement(
          "svg",
          {
            width: "11",
            height: "12",
            viewBox: "0 0 11 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          o.createElement("path", {
            d: "M4 1H2.5C1.39543 1 0.5 1.89543 0.5 3V9C0.5 10.1046 1.39543 11 2.5 11H8.5C9.60457 11 10.5 10.1046 10.5 9V7.5M5.5 6L10.5 1M10.5 1H6.5M10.5 1V5",
            stroke: "#4A6EE0",
            strokeLinecap: "round",
          })
        );
      var Aa = i(5872),
        Ca = i(26485),
        Ea = i(68089);
      const Ia = ({ children: e, blocked: t, wrapperClassName: i }) =>
        t
          ? o.createElement(
              Xt.u,
              { message: "Sign in to use this feature", position: "top" },
              o.createElement(
                "div",
                { className: i },
                o.createElement(
                  "div",
                  {
                    className: Ea.hover_blocker,
                    onClick: Ee.EI,
                    onDoubleClick: Ee.EI,
                  },
                  e
                )
              )
            )
          : o.createElement(o.Fragment, null, e);
      class Ma extends o.Component {
        constructor() {
          super(...arguments),
            (this.handleChange = (e) => {
              (this.props.skipTrustedCheck || e.isTrusted) &&
                this.props.onChange(e);
            });
        }
        render() {
          return o.createElement(
            "div",
            {
              ...(0, Rt.Sh)(
                this.props.extraClassName,
                Ca.setting_item,
                this.props.disabled && Ca.disabled
              ),
            },
            o.createElement(
              "label",
              {
                className: (0, Aa.cs)(
                  Ca.select_checkbox,
                  this.props.centered ? Ca.centered : void 0
                ),
                "data-grammarly-part": this.props.dataGrammarlyPart,
              },
              o.createElement(
                "div",
                { className: Ca.select_children },
                this.props.children,
                this.props.beta &&
                  o.createElement("span", {
                    className: (0, Ce.G6)() ? Ca.new : Ca.beta,
                  }),
                this.props.alpha &&
                  o.createElement("span", {
                    className: (0, Ce.G6)() ? Ca.new : Ca.alpha,
                  })
              ),
              o.createElement(Ia, {
                wrapperClassName: Ca.checkbox_control_wrapper,
                blocked: this.props.disabled,
              }),
              o.createElement("input", {
                className: Ca.checkbox,
                onChange: this.props.disabled ? Ee.EI : this.handleChange,
                checked: this.props.checked,
                type: "checkbox",
              }),
              o.createElement(
                "div",
                {
                  ...(0, Rt.Sh)(
                    Ca.checkbox_check,
                    this.props.grayOut && Ca.grayOut,
                    this.props.checked ? Ca.on : Ca.off
                  ),
                },
                o.createElement(
                  "div",
                  { ...(0, Rt.Sh)(Ca.on_off) },
                  this.props.checked ? "ON" : "OFF"
                ),
                o.createElement("div", { className: Ca.checkbox_check_round })
              )
            )
          );
        }
      }
      var Ta = i(62111),
        xa = i(47740);
      const Ra = ({ showTitle: e, showBackground: t, openGBLanding: i }) =>
        o.createElement(
          "div",
          {
            ...(0, Rt.Sh)(xa.container, t ? xa.containerWithBackground : null),
          },
          o.createElement(
            "div",
            { className: xa.content },
            e &&
              o.createElement(
                "div",
                { className: xa.title },
                "Grammarly for your team"
              ),
            o.createElement(
              "div",
              null,
              "Help your team make your business look great with top-notch writing."
            ),
            o.createElement(
              ci.z,
              {
                size: "medium",
                onClick: () => {
                  i((0, Ce.Um)().businessEHomepage),
                    (0, Ta.T)().gGbUpHookClick();
                },
                className: xa.button,
              },
              "Explore Grammarly Business"
            )
          )
        );
      var La = i(1005);
      const Fa = ({ heading: e, enabled: t, children: i }) =>
        t
          ? o.createElement(
              o.Fragment,
              null,
              o.createElement("div", { className: La.heading }, e),
              o.createElement("div", null, i)
            )
          : o.createElement(o.Fragment, null, i);
      var Pa = i(4120),
        Va = i(24372);
      class Ba extends o.Component {
        constructor() {
          super(...arguments),
            (this.onEnableDefsClick = (e) => {
              const { toggleDefs: t } = this.props,
                i = e.target.checked;
              t(i),
                Va.J.definitionToggleClick(i ? "on" : "off"),
                (0, Ta.T)().toggleExtensionDefs(i);
            });
        }
        render() {
          const { enabledDefs: e, disabled: t } = this.props;
          return o.createElement(
            Ma,
            {
              onChange: this.onEnableDefsClick,
              checked: e,
              extraClassName: ya.def_switcher,
              dataGrammarlyPart: "definitionAndSynonymsSwitcher",
              disabled: t,
              skipTrustedCheck: this.props.skipTrustedCheck,
            },
            "Show definitions and synonyms ",
            o.createElement("br", null),
            "via double clicks (all sites)"
          );
        }
      }
      var Oa = i(6304),
        Na = i(66402);
      const Da = () =>
        o.createElement(
          "svg",
          {
            width: "32",
            height: "32",
            viewBox: "0 0 32 32",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          o.createElement("path", {
            d: "M13.9207 15L15.5 17.2562L17.0793 15H13.9207Z",
            stroke: "#6D758D",
            strokeWidth: "2",
          })
        );
      var Ua = i(64757),
        Ha = i(18813),
        ja = i(71527);
      const Wa = {
          american: o.createElement(
            () =>
              o.createElement("div", {
                className: Na.american,
                role: "presentation",
              }),
            null
          ),
          australian: o.createElement(
            () =>
              o.createElement("div", {
                className: Na.australian,
                role: "presentation",
              }),
            null
          ),
          british: o.createElement(
            () =>
              o.createElement("div", {
                className: Na.british,
                role: "presentation",
              }),
            null
          ),
          canadian: o.createElement(
            () =>
              o.createElement("div", {
                className: Na.canadian,
                role: "presentation",
              }),
            null
          ),
        },
        Ga = ["british", "american", "australian", "canadian"],
        za = (e) => {
          return o.createElement(
            o.Fragment,
            null,
            Wa[e.dialect],
            o.createElement(
              "span",
              { "data-test-attr": `dialect_${e.dialect}`, className: ja.label },
              (t = e.dialect).charAt(0).toUpperCase() + t.slice(1) + " English"
            )
          );
          var t;
        };
      class qa extends o.Component {
        render() {
          const e = this.props.dropdownOnTop
            ? { customPosition: { top: "-100px", left: "0" }, vAlign: "top" }
            : { customPosition: { top: "36px", left: "0" } };
          return o.createElement(
            Ha.L,
            {
              ...e,
              showDelay: 0,
              closeDelay: 150,
              appearanceBehavior: "mouseClick",
              name: "dialect",
              label: o.createElement(
                Ua.zx.White,
                { name: "dialect.box", style: { padding: "0" } },
                o.createElement(
                  "div",
                  { className: ja.selected },
                  o.createElement(za, { dialect: this.props.dialect }),
                  o.createElement(Da, null)
                )
              ),
            },
            Ga.filter((e) => e !== this.props.dialect).map((e) =>
              o.createElement(
                Ua.zx.Flat,
                {
                  name: e,
                  key: e,
                  onClick: (t) =>
                    (null == t ? void 0 : t.isTrusted) &&
                    this.props.onSetDialect(e),
                },
                o.createElement(
                  "div",
                  { className: ja.option },
                  o.createElement(za, { dialect: e })
                )
              )
            )
          );
        }
      }
      class Ka extends o.Component {
        constructor() {
          super(...arguments),
            (this.setDialect = (e) => {
              const { changeStrongDialect: t, dialectWeak: i } = this.props;
              t(e);
              const a = e + "English";
              Va.J.languageSettingUpdate(a, "user", i && e === i);
            });
        }
        render() {
          const e =
            this.props.dialectStrong || this.props.dialectWeak || "american";
          return o.createElement(
            "div",
            { ...(0, Rt.Sh)(Oa.line, this.props.disabled && Oa.disabled) },
            o.createElement("div", null, "I write in"),
            o.createElement(
              Ia,
              { blocked: this.props.disabled },
              o.createElement(
                "div",
                { className: Oa.dialectPicker },
                o.createElement(qa, {
                  dialect: e,
                  onSetDialect: this.setDialect,
                  dropdownOnTop: !!this.props.dropdownOnTop,
                })
              )
            )
          );
        }
      }
      const Za = (e) => {
        const t = "docs.google.com" === e.domain,
          i = t ? "Google Docs" : e.domain,
          a = t && !(0, Ce.Am)(),
          { enabledInConfig: s, siteSwitcherChecked: r, favicon: n } = e,
          l = r.checked && s,
          c = s ? "Check for writing suggestions" : "Checking is not supported";
        return o.createElement(
          Ma,
          {
            grayOut: !s,
            onChange: (e) => r.update(e.target.checked),
            checked: l,
            extraClassName: ya.site_switcher,
            dataGrammarlyPart: "siteSwitcher",
            skipTrustedCheck: e.skipTrustedCheck,
            centered: !!e.centeredToggle,
          },
          o.createElement(
            "div",
            { "data-test-attr": "siteControlsLabelText" },
            c,
            o.createElement("br", null),
            " ",
            o.createElement(
              "span",
              { ...(0, Rt.Sh)(ya.domain, e.centeredToggle && ya.centered) },
              o.createElement("span", { className: ya.thin_text }, "on"),
              " ",
              n &&
                o.createElement(
                  "span",
                  { className: ya.favicon },
                  o.createElement("img", {
                    width: "16px",
                    height: "16px",
                    src: n,
                  })
                ),
              i,
              a && o.createElement("span", { className: Ca.beta })
            )
          )
        );
      };
      var Xa = i(56542),
        Ya = i(37896),
        Qa = i(23345);
      const $a = o.createContext({}),
        Ja = (e) => {
          const t = o.useContext($a),
            { registrationDate: i } = e.user,
            a = (0, Ya.p6)(i);
          return o.createElement(
            "div",
            { className: Qa.line },
            o.createElement(
              "div",
              { className: Qa.content },
              a &&
                o.createElement(
                  "div",
                  { "data-test-attr": "checked_since" },
                  "Grammarly has been correcting your text since ",
                  a,
                  "."
                ),
              o.createElement(
                "div",
                {
                  "data-grammarly-part": "summaryUpgradeBtn",
                  className: Qa.upgrade,
                  onClick: () => {
                    e.openSubscriptionDialog({
                      utmSource: "upHook",
                      utmCampaign: "extensionSettingsToolbar",
                    }),
                      Va.J.getPremiumButtonClick(
                        e.isAssistant ? "assistantSettings" : "settingsToolbar",
                        "GoPremiumToEnableAdvancedFixes"
                      ),
                      (0, Ta.T)().userUpgradeClick("settingsToolbar");
                  },
                  style: { fontSize: t.ctaFontSize },
                },
                "Go Premium to Enable Advanced Fixes"
              )
            )
          );
        },
        es = (e) =>
          o.createElement(
            Ma,
            {
              onChange: (t) => {
                e.toggle(t.target.checked);
              },
              checked: e.enabled,
              extraClassName: ya.def_switcher,
            },
            "Correct spelling automatically"
          ),
        ts = (e) =>
          o.createElement(
            Ma,
            {
              checked: !e.enabled,
              extraClassName: ya.def_switcher,
              onChange: (t) => {
                e.toggle(!t.target.checked);
              },
              dataGrammarlyPart: "disableDesktopIntegrationToggle",
            },
            o.createElement(
              "div",
              { className: ya.llamaTitle },
              "Check text with browser extension"
            ),
            e.enabled &&
              o.createElement(
                "div",
                { className: ya.llamaDescription },
                "Grammarly's browser extension was deactivated since you're using Grammarly's desktop application."
              )
          ),
        is = (e) =>
          o.createElement(
            Ma,
            {
              onChange: (t) => {
                e.toggle(t.target.checked);
              },
              beta: true,
              checked: e.enabled,
              extraClassName: ya.def_switcher,
            },
            "Show phrasal predictions"
          ),
        as = (e) =>
          o.createElement(
            Ma,
            {
              onChange: (t) => {
                e.toggle(t.target.checked);
              },
              beta: true,
              checked: e.enabled,
              extraClassName: ya.def_switcher,
            },
            "Show email recaps"
          ),
        ss = (e) => {
          var t, i, a, s;
          const {
            actions: r,
            activeTab: n,
            config: l,
            settings: c,
            user: d,
            siteCategory: u,
            openSubscriptionDialog: p,
            openGBLanding: m,
            showGBUpHook: h,
            placement: g,
            dynamicConfig: v,
            enableRenderingHack: f = false,
            isReaderSupported: w = false,
          } = e;
          f &&
            o.useEffect(() => {
              (0, Ce.CB)() &&
                (self.screenLeft < 0 ||
                  self.screenTop < 0 ||
                  self.screenLeft > self.screen.width ||
                  self.screenTop > self.screen.height) &&
                chrome.runtime.getPlatformInfo((e) => {
                  if ("mac" === e.os) {
                    const e = new CSSStyleSheet();
                    e.insertRule(
                      "\n            @keyframes redraw {\n              0% {\n                opacity: 1;\n              }\n              100% {\n                opacity: .99;\n              }\n            }\n          "
                    ),
                      e.insertRule(
                        "\n            html {\n              animation: redraw 1s linear infinite;\n            }\n          "
                      ),
                      (document.adoptedStyleSheets = [
                        ...document.adoptedStyleSheets,
                        e,
                      ]);
                  }
                });
            }, []);
          const { premium: b, experiments: S, anonymous: y } = d,
            _ = h && b && !Pa.n5.doesUserBelongToInstitution(d),
            k = b || y,
            A = e.siteSwitcherChecked || {
              checked: !!c.enabled,
              update: (t) => {
                const { siteCategory: i } = e;
                r.toggleSite(t, l.domain),
                  Va.J.checkingToggleClick("toolbar", i, t ? "on" : "off"),
                  (0, Ta.T)().toggleExtension(t, "toolbar");
              },
            },
            C = false;
          return o.createElement(
            "div",
            {
              className: Xa.settingsContent,
              "data-grammarly-part": "settings",
            },
            o.createElement(
              "div",
              { className: Xa.heading },
              o.createElement("div", null, "Quick Settings"),
              o.createElement(
                ci.z,
                {
                  kind: "link",
                  onClick: () => {
                    e.openUrl((0, Ce.Um)().allSettings),
                      Va.J.allSettingsButtonClick(g);
                  },
                },
                o.createElement(
                  "div",
                  { className: Xa.allSettings },
                  o.createElement("span", null, "All Settings"),
                  o.createElement(ka, null)
                )
              )
            ),
            _a.q.showSettingPopupToggle(c, v, null == n ? void 0 : n.url) &&
              o.createElement(
                Fa,
                { heading: "DESKTOP INTEGRATION SETTING", enabled: C },
                o.createElement(ts, {
                  toggle: (e) => {
                    r.setDesktopIntegration(e),
                      Va.J.desktopIntegrationToggleClick(e ? "on" : "off");
                  },
                  enabled: c.isDesktopIntegrationEnabled,
                }),
                o.createElement("div", { className: Xa.separator })
              ),
            o.createElement(
              Fa,
              { heading: "SITE SETTINGS", enabled: C },
              o.createElement(Za, {
                domain: l.domain,
                enabledInConfig: l.enabled,
                siteSwitcherChecked: A,
                favicon: null == n ? void 0 : n.favIconUrl,
                siteCategory: u,
                experiments: S,
              }),
              o.createElement("div", { className: Xa.separator })
            ),
            o.createElement(
              Fa,
              { heading: "FEATURES (ALL SITES)", enabled: C },
              o.createElement(Ba, {
                disabled: y,
                enabledDefs: c.enabledDefs,
                toggleDefs: r.toggleDefs,
              }),
              o.createElement("div", { className: Xa.separator }),
              o.createElement(es, {
                enabled: c.autocorrectEnabled || false,
                toggle: (e) => {
                  r.toggleAutocorrect(e),
                    Va.J.autocorrectToggleClick(e ? "on" : "off");
                },
              }),
              o.createElement("div", { className: Xa.separator }),
              o.createElement(is, {
                enabled: c.autocompleteEnabled || false,
                toggle: (e) => {
                  r.toggleAutocomplete(e),
                    Va.J.autocompleteFeatureToggleClick(
                      "popup",
                      e ? "on" : "off"
                    );
                },
              }),
              w &&
                (null ===
                  (i =
                    null === (t = c.reader) || void 0 === t
                      ? void 0
                      : t.gmail) || void 0 === i
                  ? void 0
                  : i.seenOnboarding) &&
                o.createElement(
                  o.Fragment,
                  null,
                  o.createElement("div", { className: Xa.separator }),
                  o.createElement(as, {
                    enabled:
                      (null ===
                        (s =
                          null === (a = c.reader) || void 0 === a
                            ? void 0
                            : a.gmail) || void 0 === s
                        ? void 0
                        : s.enabled) || false,
                    toggle: (e) => {
                      r.toggleReader(e),
                        Va.J.readerMailFeatureToggleClick(e ? "on" : "off");
                    },
                  })
                )
            ),
            o.createElement(
              Fa,
              { heading: "CUSTOMIZE GRAMMARLY", enabled: C },
              o.createElement("div", { className: Xa.separator }),
              o.createElement(Ka, {
                changeStrongDialect: r.changeStrongDialect,
                dialectStrong: c.dialectStrong,
                dialectWeak: c.dialectWeak,
                dropdownOnTop: k,
                disabled: y,
              }),
              C
            ),
            !k &&
              o.createElement(Ja, {
                user: d,
                openSubscriptionDialog: p,
                isAssistant: "assistant" === g,
              }),
            _ &&
              o.createElement(Ra, {
                openGBLanding: m,
                showTitle: "popup" === g,
                showBackground: "popup" === g,
              })
          );
        };
      var rs = i(32138),
        ns = i(82785),
        os = i(91574);
      const ls = ({ viewModels: e, children: t }) => {
          const {
              domain: i,
              actions: a,
              state: s,
            } = e.assistantSettingsViewModel,
            [r, n] = o.useState(!!s.view("commonSettings", "enabled").get()),
            l = { checked: r, update: n };
          return t({
            content: o.createElement(
              xt.F.Fragment,
              null,
              s.view(({ user: t, commonSettings: s, dynamicConfig: r }) =>
                o.createElement(
                  $a.Provider,
                  { value: { ctaFontSize: 13 } },
                  o.createElement(ss, {
                    actions: a,
                    config: { enabled: true, domain: i },
                    settings: s,
                    user: t,
                    dynamicConfig: r,
                    siteCategory: ns.y.other,
                    openSubscriptionDialog: () =>
                      e.upgradeViewModel.openUpgradeUrl(
                        pe.L.Place.extensionSettingsAssistant
                      ),
                    openGBLanding: (e) => {
                      const t = (0, rs.Z4)(e, "gbExtensionSettingsAssistant");
                      self.open(t),
                        Sa.J.getGBButtonClick(
                          "gbExtAssistantSettings",
                          "ExploreGrammarlyBusiness"
                        );
                    },
                    openUrl: (e) => self.open(e),
                    showGBUpHook: (0, Ce.i7)(),
                    placement: "assistant",
                    siteSwitcherChecked: l,
                  })
                )
              ),
              e.isSingleCardAssistant
                ? null
                : o.createElement(la, {
                    feedbackVM: e.assistantFeedbackViewModel,
                    entryPoint: L.Q.settings,
                  })
            ),
            onDone: () => {
              a.toggleSite(r, i),
                Sa.J.checkingToggleClick(
                  "assistant",
                  ns.y.other,
                  r ? "on" : "off"
                ),
                (0, Ta.T)().toggleExtension(r, "assistant"),
                e.assistantLayoutViewModel.popActiveView();
            },
          });
        },
        cs = ({ viewModels: e }) =>
          o.createElement(ls, { viewModels: e }, ({ content: t, onDone: i }) =>
            o.createElement(
              Gt,
              {
                dataPartName: "settings-view-overlay",
                layoutVM: e.assistantLayoutViewModel,
                panelClassName: os.settingsViewOverlayPanel,
                contentClassName: os.settingsViewOverlayContent,
                footer: o.createElement(
                  ci.z,
                  {
                    className: os.settingsViewDoneButton,
                    kind: "success",
                    type: "submit",
                    onClick: i,
                  },
                  "Done"
                ),
              },
              t
            )
          );
      var ds = i(62727),
        us = i(80550),
        ps = i(92132),
        ms = i(70091),
        hs = i(63544),
        gs = i(17161),
        vs = i(53447),
        fs = i(67521),
        ws = i(5817),
        bs = i(64078),
        Ss = i(42103),
        ys = i(33678),
        _s = i(15073),
        ks = i(101),
        As = i(85089),
        Cs = i(2834),
        Es = i(89068),
        Is = i(78674),
        Ms = i(50628),
        Ts = i(72481),
        xs = i(8313);
      const Rs = o.memo(
          ({
            viewModels: e,
            emogenieService: t,
            height: i,
            ready: a,
            OuterElementsPortalSource: s,
          }) => {
            const r = new Se.C();
            (0, S.iR)("viewModels", e);
            const l = (0, qi.IQ)(),
              c = (0, qi.e8)(),
              d = o.useContext(qi.Dg).state.pipe(
                J.h((e) => !e.dragging),
                Mt.O(hs.zM)
              ),
              u = o.useContext(gs.Y4),
              p = (0, vs.C7)(),
              h = le.h.create(Tt.UL.empty);
            (0, fs.A)(
              ht.aj([d, u]).pipe(
                oe.U(([e, t]) => {
                  const i = t.top + e.translate.y,
                    a = t.left + e.translate.x,
                    s = p.height - i - t.height,
                    r = p.width - a - t.width;
                  return {
                    height: t.height,
                    width: t.width,
                    top: i,
                    left: a,
                    bottom: s,
                    right: r,
                  };
                }),
                Cs.b(re.wW(h))
              )
            ),
              (0, fs.A)(d.pipe(Cs.b((t) => e.positionViewModel.onDrag(t)))),
              (0, fs.A)(
                e.assistantLayoutViewModel.activeView.pipe(
                  si.G(),
                  Cs.b(([t, i]) => {
                    t.type !== i.type &&
                      m.aH.isDefault(i) &&
                      e.cardsListScrollManager.paddingTop.set(0);
                  })
                )
              );
            const g = o.useRef(null);
            return (
              o.useEffect(() => {
                e.assistantCardListViewModel.cardListContext.next(
                  v.fromNullable(g.current)
                );
                const t = g.current
                    ? As.rl(g.current, { subtree: true, childList: true })
                    : qe.C,
                  i = h.view((e) => ({ top: e.top, left: e.left })),
                  s = (0, n.pipe)(
                    t,
                    Es.V((0, ws.m9)(1)),
                    Is.b(10),
                    Ms.P()
                  ).subscribe(
                    () => a(i, l),
                    () => {
                      a(i, l, true);
                    }
                  );
                return () => {
                  s.unsubscribe();
                };
              }, []),
              o.createElement(
                Ls,
                { remSize: e.remSize, environment: r, viewport: h },
                o.createElement(
                  xt.F.div,
                  {
                    "data-grammarly-part": "assistant-popup-content",
                    ...(0, Rt.Sh)(
                      Ft.assistant,
                      l.pipe(
                        Mt.O(false),
                        oe.U((e) => e && Ft.dragging)
                      )
                    ),
                    style: { height: i, maxHeight: "90vh" },
                  },
                  o.createElement(Ui, { viewModels: e, draggableRef: c }),
                  e.assistantLayoutViewModel.activeView.view((i) =>
                    m.aH.isDefault(i)
                      ? o.createElement(Nt, {
                          viewModels: e,
                          ref: g,
                          key: "default-view",
                        })
                      : m.aH.isEmogenie(i)
                      ? o.createElement(bi, {
                          emogenieService: t,
                          viewModels: e,
                          key: "emogenie-view",
                          ref: g,
                        })
                      : m.aH.isReadersAttention(i)
                      ? o.createElement(wa, {
                          viewModels: e,
                          readersAttentionVM: e.readersAttentionViewModel,
                          key: "readers-attention-view",
                          ref: g,
                        })
                      : m.aH.isReadersAttentionHelp(i)
                      ? o.createElement(ra, {
                          layoutVM: e.assistantLayoutViewModel,
                          key: "readers-attention-help",
                        })
                      : m.aH.isFeedback(i)
                      ? o.createElement(_i, {
                          feedbackVM: e.assistantFeedbackViewModel,
                          layoutVM: e.assistantLayoutViewModel,
                          key: "feedback-view",
                        })
                      : m.aH.isSettings(i)
                      ? o.createElement(cs, {
                          viewModels: e,
                          key: "settings-view",
                        })
                      : m.aH.isProofitRequest(i) &&
                        v.isSome(e.assistantProofitViewModel)
                      ? o.createElement(Ji, {
                          layoutVM: e.assistantLayoutViewModel,
                          proofitVM: e.assistantProofitViewModel.value,
                          key: "proofit-request-view",
                        })
                      : m.aH.isProofitReview(i) &&
                        v.isSome(e.assistantProofitViewModel)
                      ? o.createElement(ia, {
                          layoutVM: e.assistantLayoutViewModel,
                          proofitVM: e.assistantProofitViewModel.value,
                          key: "proofit-review-view",
                        })
                      : m.aH.isPopup(i)
                      ? o.createElement(ji, {
                          key: "popup-view",
                          viewModels: e,
                        })
                      : null
                  )
                ),
                o.createElement(
                  s,
                  null,
                  o.createElement(
                    ms.jv,
                    null,
                    o.createElement(us.L, {
                      modalManager: e.assistantModalManager,
                    })
                  )
                ),
                o.createElement(bs.X, null)
              )
            );
          }
        ),
        Ls = ({ environment: e, viewport: t, children: i, remSize: a }) => {
          var s;
          const r = o.useRef(
              St(
                vt.m.getConfig(
                  e.has(Se.U.Flag.isAppleSystem) ? "mac" : "windows"
                )
              )
            ),
            n =
              null === (s = o.useContext(ds.n.Context)) || void 0 === s
                ? void 0
                : s.host;
          return o.createElement(
            ps.Q,
            {
              remSize: a,
              setter: (e) =>
                _s.u.setRootCssVar(n || document.documentElement, e),
            },
            o.createElement(
              Ts.p.Manager,
              {
                cardWidth: Ts.p.withCardWidthEffect(
                  Ts.p.defaultSizeObserver,
                  (e) => {
                    Ts.p.setRootCssVar(n || document.documentElement, e);
                  }
                ),
              },
              o.createElement(
                Se.U.Context.Provider,
                { value: e },
                o.createElement(
                  ys.a.Context.Provider,
                  { value: e },
                  o.createElement(
                    gt.Context.Provider,
                    { value: r.current.assistant },
                    o.createElement(
                      vt.m.Context.Provider,
                      { value: r.current.denali },
                      o.createElement(
                        xs.TG.ContextMock,
                        null,
                        o.createElement(
                          ks.l.RootVirtualContainer,
                          { viewport: t, name: "draggable" },
                          o.createElement(
                            Ss.G.DefaultProvider,
                            null,
                            o.createElement(ms.jv, null, i)
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          );
        };
      var Fs = i(63919),
        Ps = i(62337);
      const Vs = ({
          textFieldRect: e,
          viewModels: t,
          gButtonRect: i,
          draggableGButtonType: a,
          children: s,
        }) => {
          const { initialPositionOffset: r } = t.positionViewModel,
            n = Ps.UL.shift(i, Fs.E9.minus(e.client, e.page)),
            l = null === a ? { ...e.client, ...e.size } : n,
            c = (0, vs.C7)(),
            d =
              null === a
                ? t.assistantLayoutViewModel.layout
                : $.V.draggableGButtonClassicAssistantLayout(n, e);
          return o.createElement(
            qi._l,
            { bounds: c, hasDragHandle: true },
            ({ translate: e }) =>
              o.createElement(
                gs.sX,
                {
                  anchorRect: l,
                  viewportRect: c,
                  anchorOrigin: d.anchorOrigin,
                  elementOrigin: d.assistantOrigin,
                  anchorMargin: d.anchorMargin,
                  repositioning: d.repositioningStrategy,
                  stickToTarget: false,
                  viewportMargin: 0,
                  postRepositioningOffset: {
                    horizontal: r.left,
                    vertical: r.top,
                  },
                },
                ({ top: t, left: i }) =>
                  o.createElement(
                    "div",
                    {
                      "data-grammarly-part": "assistant-popup",
                      style: {
                        position: "fixed",
                        transform: `translate(${e.x}px, ${e.y}px)`,
                        zIndex: Vi.Eq,
                        top: t,
                        left: i,
                      },
                    },
                    s
                  )
              )
          );
        },
        Bs = ({
          gbuttonRect: e,
          viewModels: t,
          onDomRectChange: i,
          children: a,
        }) => {
          const s = (0, vs.C7)(),
            [r, n] = o.useState(hs.zM),
            [l, c] = o.useState(null),
            [d, u] = o.useState(null),
            [p, m] = o.useState(gs.KC.top),
            [h, g] = o.useState(gs.KC.left),
            [v, f] = o.useState(gs.KC.height),
            [w, b] = o.useState(gs.KC.width),
            S = o.useRef(new ot.X(gs.KC)),
            y = null != d ? d : r.translate;
          return (
            o.useEffect(() => {
              const e = S.current.pipe(si.G()).subscribe(([e, t]) => {
                let i, a;
                (h !== gs.KC.left && e.left === t.left) || (i = t.left),
                  p === gs.KC.top
                    ? (a = t.top)
                    : e.height !== t.height &&
                      ((a = p - (t.height - e.height)), a < 0 && (a = 0)),
                  void 0 !== a && m(a),
                  void 0 !== i && g(t.left),
                  f(t.height),
                  b(t.width);
              });
              return () => e.unsubscribe();
            }, [p, h]),
            o.useEffect(() => {
              const e = s.height - p - v,
                t = s.height - h - w;
              i({ top: p, left: h, bottom: e, right: t, height: v, width: w });
            }, [p, h, w, v]),
            o.useEffect(() => {
              !r.dragging &&
                r.dragEnd &&
                (m(p + y.y), g(h + y.x), c(r.translate), u({ x: 0, y: 0 }));
            }, [r]),
            o.useEffect(() => {
              r.dragging &&
                d &&
                l &&
                u({ x: r.translate.x - l.x, y: r.translate.y - l.y });
            }, [r]),
            o.createElement(
              qi._l,
              { bounds: s, hasDragHandle: true, onChangeDragState: n },
              o.createElement(
                gs.sX,
                {
                  anchorRect: e,
                  viewportRect: s,
                  anchorOrigin: t.assistantLayoutViewModel.layout.anchorOrigin,
                  elementOrigin:
                    t.assistantLayoutViewModel.layout.assistantOrigin,
                  anchorMargin: t.assistantLayoutViewModel.layout.anchorMargin,
                  repositioning:
                    t.assistantLayoutViewModel.layout.repositioningStrategy,
                  stickToTarget: false,
                  viewportMargin: 0,
                  postRepositioningOffset: {
                    horizontal: t.positionViewModel.initialPositionOffset.left,
                    vertical: t.positionViewModel.initialPositionOffset.top,
                  },
                  onChangePosition: (e) => S.current.next(e),
                },
                o.createElement(
                  "div",
                  {
                    style: {
                      position: "fixed",
                      transform: `translate(${y.x}px, ${y.y}px)`,
                      zIndex: Vi.Eq,
                      top: p,
                      left: h,
                    },
                  },
                  a
                )
              )
            )
          );
        };
      var Os = i(31699);
      const Ns = ({ htmlToSanitize: e, ...t }) =>
        o.createElement("div", {
          ...t,
          dangerouslySetInnerHTML: { __html: (0, Os.sanitize)(e) },
        });
      var Ds = i(7538);
      const Us = ({ details: e, examples: t }) =>
          o.createElement(
            "div",
            { className: Ds.learnMore },
            o.createElement(Ns, { htmlToSanitize: e }),
            t.map((e, t) => {
              const i = e.type === ie.correct,
                a = e.type === ie.incorrect,
                s =
                  i || a
                    ? o.createElement("div", {
                        ...(0, Rt.Sh)(
                          Ds.learnMoreExampleIcon,
                          i ? Ds.learnMoreExampleCorrectIcon : null,
                          a ? Ds.learnMoreExampleIncorrectIcon : null
                        ),
                      })
                    : null;
              return o.createElement(
                "div",
                {
                  className: Ds.learnMoreExample,
                  key: `learn-more-example-${t}`,
                },
                e.title
                  ? o.createElement(
                      o.Fragment,
                      null,
                      o.createElement(
                        "div",
                        { className: Ds.learnMoreExampleIconAndTitle },
                        s,
                        o.createElement(
                          "div",
                          { className: Ds.learnMoreExampleTitle },
                          e.title
                        )
                      ),
                      o.createElement(Ns, {
                        ...(0, Rt.Sh)(
                          s ? Ds.learnMoreExampleTextMarginLeft : null,
                          e.useItalicText ? Ds.learnMoreExampleTextItalic : null
                        ),
                        htmlToSanitize: e.text,
                      })
                    )
                  : o.createElement(Ns, {
                      ...(0, Rt.Sh)(
                        e.useItalicText ? Ds.learnMoreExampleTextItalic : null
                      ),
                      htmlToSanitize: e.text,
                    })
              );
            })
          ),
        Hs = ({ learnMoreInfo: e }) =>
          o.createElement(
            xt.F.Fragment,
            null,
            e.view((e) =>
              e
                ? o.createElement(Us, {
                    details: e.details,
                    examples: e.examples,
                  })
                : null
            )
          );
      var js = i(18991),
        Ws = i(24641);
      const Gs = ({
          activeView: e,
          toneDetectorButtonInfo: t,
          toneDetectorBrandTonesHeaderInfo: i,
          learnMoreInfoTitle: a,
          browser: s,
          notify: r,
        }) =>
          o.createElement(js.P, {
            content: er({
              activeView: e,
              toneDetectorButtonInfo: t,
              brandTonesInfo: i,
              learnMoreInfoTitle: a,
              showBetaBadge: "safari" !== s,
            }),
            prevContent: v.none,
            transitions: [],
            designSystem: Ws.k,
            notify: r,
            onAnimationEnd: h.Q1,
            onMount: h.Q1,
            sduiRootId: "single-card-assistant-header",
          }),
        zs = (e) => {
          const t = e.emojiId
            ? (0, ii.gT)([e.emojiId])
            : (0, ii.gT)((0, ii.Uq)(e.emojiLiteral));
          return (
            (i = _.zx.createIcon(
              e.showHighlight ? "tone-detector-highlighted" : "tone-detector",
              _.JO.Source.createUrl(t, e.emojiId, k.T.D125),
              [
                { type: "openToneDetector" },
                { type: "notify", userAction: k.nz.Click },
              ],
              k.Lv.Secondary,
              "See how your text may sound to readers"
            )),
            { ...i, label: { ...i.label, verticalAlign: k.g$.Middle } }
          );
          var i;
        },
        qs = (e) =>
          _.xv.create(e, k.yH.Small, [], k.Il.CoreNeutral50, void 0, void 0),
        Ks = _.gO.create(
          "beta-badge-block",
          { top: k.T.D025, right: k.T.D0, bottom: k.T.D0, left: k.T.D025 },
          void 0,
          {
            type: "image",
            id: "beta-badge",
            name: "beta-badge",
            url: "https://assets.grammarly.com/sdui/v1/beta.svg",
            width: 2,
            height: 1,
          }
        ),
        Zs = _.zx.createIcon(
          "feedback",
          _.JO.Source.createKnown(k.Tb.Feedback),
          [
            { type: "openFeedback" },
            { type: "notify", userAction: k.nz.Click },
          ],
          k.Lv.Secondary,
          "Provide feedback"
        ),
        Xs = (e, t, i, a) => {
          let s = [];
          return (
            Q.isEmogenie(e)
              ? (s = ((e, t) => (t ? [...e, Ks] : e))(
                  i
                    ? ((e) => {
                        var t;
                        const i = qs(
                          `${
                            null !== (t = e.institutionName) && void 0 !== t
                              ? t
                              : ""
                          } Tone Detector`
                        );
                        return e.institutionLogo
                          ? [
                              ((a = e.institutionLogo),
                              _.JO.create(
                                _.JO.Source.createUrl(a, "logo", k.T.D1),
                                void 0
                              )),
                              i,
                            ]
                          : [i];
                        var a;
                      })(i)
                    : [qs("Tone insights")],
                  t
                ))
              : Q.isFeedback(e)
              ? (s = [qs("Product feedback")])
              : Q.isSettings(e)
              ? (s = [qs("Settings")])
              : Q.isLearnMore(e) && (s = a ? [qs(a)] : []),
            {
              ..._.gO.create("title", void 0, void 0, ...s),
              verticalAlign: k.g$.Middle,
            }
          );
        },
        Ys = _.zx.createIcon(
          "settings",
          _.JO.Source.createKnown(k.Tb.Gear),
          [
            { type: "openSettings" },
            { type: "notify", userAction: k.nz.Click },
          ],
          k.Lv.Secondary,
          "Options"
        ),
        Qs = _.zx.createIcon(
          "close",
          _.JO.Source.createKnown(k.Tb.Close),
          [{ type: "closeCard" }, { type: "notify", userAction: k.nz.Click }],
          k.Lv.Secondary,
          "Close panel"
        ),
        $s = "back-button",
        Js = {
          ..._.zx.createIcon(
            "back",
            _.JO.Source.createKnown(k.Tb.ArrowLeft),
            [{ type: "notify", userAction: k.nz.Click }],
            k.Lv.Secondary,
            "Back to suggestions"
          ),
          id: $s,
        },
        er = ({
          activeView: e,
          toneDetectorButtonInfo: t,
          brandTonesInfo: i,
          learnMoreInfoTitle: a,
          showBetaBadge: s,
        }) => {
          const r = Q.isDefault(e),
            n = [
              r ? void 0 : _.gO.create("left-top-buttons", void 0, void 0, Js),
              t && r ? zs(t) : void 0,
              Xs(e, s, i, a),
            ].filter(Ee.fQ);
          return _.sg.create([
            _.X2.create(
              n,
              [_.gO.create("right-top-buttons", void 0, void 0, Zs, Ys, Qs)],
              { top: k.T.D025, right: k.T.D05, bottom: k.T.D025, left: k.T.D05 }
            ),
          ]);
        };
      var tr = i(29758),
        ir = i(12267);
      const ar = o.forwardRef(
        (
          {
            draggableRef: e,
            headerContent: t,
            className: i,
            children: a,
            includeContentPadding: s = false,
            footer: r,
            maxContentHeight: n,
          },
          l
        ) => {
          const [c, d] = o.useState(0),
            [u, p] = o.useState(0),
            [m, h] = o.useState(40),
            [g, v] = o.useState(false),
            f = o.useRef(null),
            w = o.useRef(null);
          o.useEffect(() => {
            h(c + u + 40);
          }, [c, u]);
          const b = o.useRef(null);
          o.useEffect(() => {
            var e;
            return (
              f.current
                ? (null === (e = b.current) || void 0 === e || e.disconnect(),
                  (b.current = tr.N.getResizeObserver(() => {
                    f.current && d(f.current.getBoundingClientRect().height);
                  })),
                  b.current.observe(f.current))
                : d(0),
              () => {
                var e;
                return null === (e = b.current) || void 0 === e
                  ? void 0
                  : e.disconnect();
              }
            );
          }, [f.current]);
          const S = o.useRef(null);
          o.useEffect(() => {
            var e;
            return (
              w.current
                ? (null === (e = S.current) || void 0 === e || e.disconnect(),
                  (S.current = tr.N.getResizeObserver(() => {
                    w.current && p(w.current.getBoundingClientRect().height);
                  })),
                  S.current.observe(w.current))
                : p(0),
              () => {
                var e;
                return null === (e = S.current) || void 0 === e
                  ? void 0
                  : e.disconnect();
              }
            );
          }, [r, w.current]);
          const y = o.useCallback(
            () => v(!!f.current && f.current.scrollTop > 0),
            [f.current]
          );
          return (
            o.useEffect(() => {
              f.current && ((f.current.scrollTop = 0), v(false));
            }, [f.current, c]),
            o.createElement(
              "div",
              {
                ...(0, Rt.Sh)(ir.singleCardAssistant, i),
                "data-grammarly-part": "single-card-assistant",
                ref: l,
                style: { height: m },
              },
              o.createElement(
                "div",
                {
                  "data-grammarly-part": "single-card-assistant-header",
                  ...(0, Rt.Sh)(
                    ir.singleCardAssistantHeader,
                    e ? ir.singleCardAssistantHeaderDraggable : null
                  ),
                  ref: e,
                },
                o.createElement(xt.F.Fragment, null, t)
              ),
              o.createElement(
                "div",
                {
                  ...(0, Rt.Sh)(
                    ir.singleCardAssistantContent,
                    s ? ir.singleCardAssistantContentWithPadding : null,
                    g ? ir.singleCardAssistantContentScrolled : null
                  ),
                  style: n ? { maxHeight: n, overflowY: "auto" } : void 0,
                  ref: f,
                  onScroll: y,
                },
                a
              ),
              r
                ? o.createElement(
                    "div",
                    {
                      className: ir.singleCardAssistantFooter,
                      ref: w,
                      onClick: () => r.onClick(),
                    },
                    o.createElement(
                      "div",
                      { className: ir.singleCardAssistantFooterText },
                      r.content
                    ),
                    o.createElement(
                      Xt.u,
                      { message: r.tooltip, showDelay: Vi.gk },
                      o.createElement(
                        Qt.h,
                        { onClick: () => r.onClick() },
                        o.createElement("div", {
                          className: ir.singleCardAssistantFooterButtonIcon,
                        })
                      )
                    )
                  )
                : null
            )
          );
        }
      );
      var sr = i(17208);
      const rr = ({ acceptedSuggestionsCount: e, wordsCount: t }) =>
        o.createElement(
          "div",
          { className: sr.successReport },
          o.createElement("div", { className: sr.successReportIcon }),
          o.createElement(
            "div",
            { className: sr.successReportTitle },
            t < 2
              ? "Looking good so far"
              : e > 0
              ? `${e} ${y._6(e, "issue addressed", "issues addressed")}`
              : "Nice job!"
          ),
          o.createElement(
            "div",
            { className: sr.successReportSubtitle },
            t < 2
              ? "Keep writing to see suggestions."
              : e > 0
              ? "All clear!"
              : "You made that look easy!"
          )
        );
      var nr = i(43314),
        or = i(58346);
      const lr = o.memo(
        ({ viewModels: e, height: t, domRect: i, ready: a }) => {
          var s, r, l, c, d, u;
          const p = new Se.C();
          (0, S.iR)("viewModels", e);
          const h = (0, qi.IQ)(),
            g = (0, qi.e8)(),
            v = o.useContext(qi.Dg).state.pipe(
              J.h((e) => !e.dragging),
              Mt.O(hs.zM)
            );
          (0, fs.A)(v.pipe(Cs.b((t) => e.positionViewModel.onDrag(t)))),
            o.useEffect(() => {
              const e = i.view((e) => ({ top: e.top, left: e.left }));
              a(e, h);
            }, []);
          const f = o.useRef(null),
            w = o.useRef(null);
          o.useEffect(() => {
            var e;
            return (
              f.current &&
                (null === (e = w.current) || void 0 === e || e.disconnect(),
                (w.current = tr.N.getResizeObserver(b)),
                w.current.observe(f.current)),
              () => {
                var e;
                return null === (e = w.current) || void 0 === e
                  ? void 0
                  : e.disconnect();
              }
            );
          }, [f.current]);
          const b = () => {
              f.current && t.set(f.current.getBoundingClientRect().height);
            },
            _ = e.lensState,
            k = ht
              .aj([
                _,
                null !==
                  (r =
                    null === (s = e.bulkDismissViewModel) || void 0 === s
                      ? void 0
                      : s.onlyBulkDismissItemsRemain) && void 0 !== r
                  ? r
                  : Ge.of(false),
                null !==
                  (c =
                    null === (l = e.bulkDismissViewModel) || void 0 === l
                      ? void 0
                      : l.bulkDismissHasBeenReviewed) && void 0 !== c
                  ? c
                  : Ge.of(false),
              ])
              .pipe(
                oe.U(
                  ([t, i, a]) =>
                    true === e.checksFeedIsInSuccess(t) || (i && !a)
                )
              ),
            A = le.h
              .combine(
                e.toneDetectorViewModel.showingToneSuggestion,
                e.toneDetectorViewModel.emogenieService.viewState.view(
                  "prevalentEmotion"
                ),
                e.toneDetectorViewModel.toneSuggestionInfo.view(
                  (e) => void 0 !== e
                ),
                (t, i, a) =>
                  !t && i
                    ? {
                        emojiId: i.emojiId,
                        emojiLiteral: i.emoji,
                        onClick: () =>
                          e.assistantLayoutViewModel.pushActiveView({
                            type: m.aH.Type.emogenie,
                          }),
                        showHighlight: a,
                      }
                    : void 0
              )
              .view(),
            C = le.h.combine(
              e.assistantLayoutViewModel.activeView,
              e.toneDetectorViewModel.emogenieService.viewState,
              (e, t) => {
                var i;
                return Q.isEmogenie(e) && t.isBrandTonesEnabled
                  ? {
                      institutionLogo:
                        null === (i = t.report) || void 0 === i
                          ? void 0
                          : i.institutionLogo,
                      institutionName: t.institutionName,
                    }
                  : void 0;
              }
            ),
            E = le.h.combine(
              e.assistantLayoutViewModel.activeView,
              e.learnMoreViewModel.learnMoreInfo,
              (e, t) =>
                Q.isLearnMore(e) && (null == t ? void 0 : t.title)
                  ? y.kC(t.title)
                  : void 0
            ),
            I = (t) => (i, a, s) => {
              a.forEach(({ type: a }) => {
                switch (a) {
                  case "notify":
                    i === $s && e.assistantLayoutViewModel.popActiveView();
                    break;
                  case "openSettings":
                    Q.isSettings(t)
                      ? e.assistantLayoutViewModel.popActiveView()
                      : e.assistantLayoutViewModel.pushActiveView({
                          type: m.aH.Type.settings,
                        });
                    break;
                  case "openFeedback":
                    Q.isFeedback(t)
                      ? e.assistantLayoutViewModel.popActiveView()
                      : e.assistantLayoutViewModel.pushActiveView({
                          type: m.aH.Type.feedback,
                        });
                    break;
                  case "openToneDetector":
                    e.assistantLayoutViewModel.pushActiveView({
                      type: m.aH.Type.emogenie,
                    });
                    break;
                  case "closeCard":
                    e.closeAssistant();
                }
              });
            },
            M = le.h
              .combine(
                e.assistantLayoutViewModel.activeView,
                A,
                C,
                E,
                (t, i, a, s) =>
                  o.createElement(Gs, {
                    activeView: t,
                    toneDetectorButtonInfo: i,
                    toneDetectorBrandTonesHeaderInfo: a,
                    learnMoreInfoTitle: s,
                    notify: I(t),
                    browser: e.assistantLayoutViewModel.browser,
                  })
              )
              .pipe(nt.shareReplay({ bufferSize: 1, refCount: false })),
            T = e.checksFeedFlow(),
            x = (0, n.pipe)(
              T,
              mt.Z.extendActions(
                Cs.b((t) => {
                  "content" === t.key &&
                    "card" === t.action.key &&
                    "alertRefSDUI" === t.action.action.key &&
                    e.cardsViewModel.actionEvents.next(t.action.action.action),
                    "content" === t.key &&
                      "card" === t.action.key &&
                      "upgradeHookCard" === t.action.action.key &&
                      ("onUpgradeHookCardMount" === t.action.action.action.type
                        ? e.upgradeHookItemViewModel.events.next({
                            type: "showedUpgradeHook",
                          })
                        : e.upgradeHookItemViewModel.events.next(
                            t.action.action.action
                          ));
                })
              )
            );
          return o.createElement(
            Ls,
            { remSize: e.remSize, environment: p, viewport: i },
            o.createElement(
              xt.F.Fragment,
              null,
              ht
                .aj([
                  e.assistantLayoutViewModel.activeView,
                  k,
                  null !==
                    (u =
                      null === (d = e.bulkDismissViewModel) || void 0 === d
                        ? void 0
                        : d.bulkDismissAlertsCount) && void 0 !== u
                    ? u
                    : le.h.create(0),
                ])
                .pipe(
                  oe.U(([t, i, a]) => {
                    const s = Q.isDefault(t),
                      r = s && !i,
                      n = s && i,
                      l = Q.isLearnMore(t),
                      c = Q.isSettings(t),
                      d = Q.isFeedback(t),
                      u = Q.isEmogenie(t);
                    return o.createElement(
                      ar,
                      {
                        className: or.singleCardAssistant,
                        draggableRef: g,
                        headerContent: M,
                        includeContentPadding: !r,
                        footer:
                          n && a > 0
                            ? {
                                content: o.createElement(
                                  o.Fragment,
                                  null,
                                  "We hid ",
                                  a,
                                  " suggestions that didn’t seem relevant to your text. Want to review them?"
                                ),
                                tooltip: "Review suggestions",
                                onClick: () => {
                                  var t;
                                  null === (t = e.bulkDismissViewModel) ||
                                    void 0 === t ||
                                    t.bulkDismissFooterReviewClicks.next(
                                      void 0
                                    );
                                },
                              }
                            : void 0,
                        ref: f,
                        maxContentHeight: l ? 216 : void 0,
                      },
                      r
                        ? mt.UI.mount(
                            nr.c.assistant(
                              e.checksFeedItem(e.cardsViewModel.actionEvents)
                            ),
                            x
                          )
                        : n
                        ? o.createElement(
                            xt.F.Fragment,
                            null,
                            le.h.combine(
                              e.statisticsService.sessionStats,
                              e.statisticsService.wordsCount,
                              (e, t) => {
                                var i;
                                return o.createElement(rr, {
                                  acceptedSuggestionsCount:
                                    null !==
                                      (i =
                                        null == e
                                          ? void 0
                                          : e.alertsStats.accepted.total) &&
                                    void 0 !== i
                                      ? i
                                      : 0,
                                  wordsCount: t,
                                });
                              }
                            )
                          )
                        : l
                        ? o.createElement(Hs, {
                            learnMoreInfo: e.learnMoreViewModel.learnMoreInfo,
                          })
                        : u
                        ? o.createElement(hi, {
                            emogenieService:
                              e.toneDetectorViewModel.emogenieService,
                            toneSuggestionInfo:
                              e.toneDetectorViewModel.toneSuggestionInfo,
                            onShowToneSuggestionInfo: (t) =>
                              e.toneDetectorViewModel.onShowToneSuggestionInfo(
                                t
                              ),
                            onClickToneSuggestionInfoCta: (t) =>
                              e.toneDetectorViewModel.onClickToneSuggestionInfoCta(
                                t
                              ),
                          })
                        : c
                        ? o.createElement(
                            ls,
                            { viewModels: e },
                            ({ onDone: e, content: t }) =>
                              o.createElement(
                                o.Fragment,
                                null,
                                t,
                                o.createElement(
                                  ci.z,
                                  {
                                    kind: "primary",
                                    type: "submit",
                                    onClick: e,
                                    className:
                                      or.singleCardAssistantSettingsDoneButton,
                                  },
                                  "Done"
                                )
                              )
                          )
                        : d
                        ? o.createElement(yi.q5, {
                            domain: e.assistantFeedbackViewModel.getDomain(),
                            hideDomainHelpText: true,
                            onClose: () =>
                              e.assistantLayoutViewModel.popActiveView(),
                            align: "left",
                            title: o.createElement(
                              "span",
                              null,
                              "How do you like Grammarly?"
                            ),
                            onSubmit: (t) =>
                              e.assistantFeedbackViewModel.submitFeedback(t),
                            withScore: true,
                            hideLogo: true,
                            hideTextBoxTitle: true,
                            placeholderText: "How can we improve?",
                            compactDisplay: true,
                            submitButtonKind: "primary",
                          })
                        : null
                    );
                  })
                )
            ),
            o.createElement(bs.X, null)
          );
        }
      );
      var cr,
        dr = i(80800),
        ur = i(9922),
        pr = i(79692),
        mr = i(49708),
        hr = i(2768);
      (0, u.C)();
      class gr {
        constructor(e, t) {
          (this._params = e),
            (this._felog = t),
            (this._log = l.Y.create(gr.name)),
            (this._integration = null),
            (this._viewModels = le.h.create(null)),
            (this._assistantPopupIsReady = new ve.xQ()),
            (this._initPerformance = void 0),
            (this._openMeasure = void 0),
            (this._height = le.h.create(0)),
            (this._domRect = le.h.create(Tt.UL.empty)),
            (this._openState = le.h.create("closed")),
            (this._subs = new ur.w.Keeper()),
            (this.openState = this._openState.view()),
            (this.open = (e, t) => {
              var i, a;
              const s = this._params.contentScriptState
                  .view("user")
                  .view((e) => ({
                    isPremium: e.premium,
                    isAnonymous: e.anonymous,
                    experiments: e.experiments,
                    customFields: e.customFields,
                    institutionInfo: e.institutionInfo,
                  })),
                r = this._viewModels.get();
              if (null !== r) vr(true, r, t);
              else {
                this._openMeasure = this._felog.openTime.startMeasure();
                const r = this._felog.initTime.startMeasure();
                this._openState.set("opening");
                const o = this._params.assistantService,
                  l = o.createIntegration({
                    gnar: this._params.gnar,
                    readersAttentionFeature:
                      this._params.readersAttentionFeature,
                    snippetsFeature: this._params.snippetsFeature,
                    shortenItFeature: this._params.shortenItFeature,
                    getSduiProtocolVersion: this._params.getSduiProtocolVersion,
                    experimentClient: this._params.experimentClient,
                  });
                if (!l)
                  return (
                    this._log.warn(
                      "tried to open assistant with checking service not initialized"
                    ),
                    r.cancelMeasure(),
                    void this._openMeasure.cancelMeasure()
                  );
                null === (a = (i = this._params).onOpen) ||
                  void 0 === a ||
                  a.call(i, l),
                  (this._integration = l);
                const c = (0, n.pipe)(
                    this._params.getSduiProtocolVersion(),
                    v.getOrElseW(() => null)
                  ),
                  d =
                    c === dr.Wz.v2
                      ? ((
                          e,
                          t,
                          i,
                          a,
                          s,
                          r,
                          n,
                          o,
                          l,
                          c,
                          d,
                          u,
                          m,
                          b,
                          y,
                          _,
                          k,
                          C,
                          E,
                          I,
                          M,
                          T,
                          x,
                          O
                        ) => {
                          const N = Qe.C8.Logging.getLogger(
                              "SingleCardAssistant.ViewModels.V2"
                            ),
                            D = le.h.create(xe.A.defaultState),
                            H = le.h.create(false),
                            j = (0, we.z)(r.view("user").get(), T),
                            W = Pe.t.create(Pe.t.defaultLensFilters, {
                              ...Pe.t.defaultTextFilters,
                              [Te.R.SpecialId.Closed]: h.jv,
                              [Te.R.SpecialId.AllAlerts]:
                                ae.bZ.belongsToAllAlerts,
                            }),
                            K = xe.A.get(
                              e.alertsList.state,
                              e.alertsList.lensesScores,
                              W
                            ).subscribe(re.wW(D)),
                            X = new ke.t(
                              D.view("lenses"),
                              W,
                              e.sessionModel.scoreStatus
                            ),
                            Y = (0, Be.$y)((0, Ie.a)(t).getContents),
                            Q = {
                              features: new Set([
                                U.IG.Features.showCardLabelInOutcomes,
                              ]),
                              cardLayoutDensityMode: De.j.Density.minimal,
                              shouldAnimateAlertApply:
                                U.IG.Default.shouldAnimateAlertApply,
                              cardVisualMode: le.h.create(
                                De.j.CardVisualMode.RegularLightMode
                              ),
                            },
                            $ = (0, U.Ls)(
                              Y,
                              e.alertsReader,
                              Q,
                              () => Ge.of(v.none),
                              e.mutingAlertsReader
                            ),
                            J = le.h.create(16),
                            ee = ct.getCapabilities($, e.alertsReader),
                            ie = ct.getSDUIClientOrd(ee),
                            se = new He.oq(
                              e.alertsList.state,
                              e.alertsReader,
                              D.view("lenses"),
                              e.positionManager,
                              X,
                              new je.gi(ct.equatable.structEq, ie),
                              () => () => h.yR,
                              ee,
                              W
                            ),
                            ne = le.h.create(
                              se
                                .emptyState(Te.R.SpecialId.AllAlerts)
                                .patch({ alertSource: ae.l$.sidebar })
                            );
                          i.next({
                            kind: be.R.ChangeLens,
                            selectedLens: "all",
                          });
                          const de = (0, Oe.u0)(() => t.getCursor().index, se),
                            ue = new Se.C(M()),
                            he = new Ve.Xx(
                              { flush: () => t.flushChanges() },
                              new ve.xQ(),
                              $,
                              e.alertsService,
                              e.sduiService,
                              () => Promise.resolve(),
                              () => Promise.resolve(),
                              (0, h.zG)(
                                e.mutedAlertsCategoriesModel,
                                v.map((e) => ({
                                  model: e,
                                  openSuggestionsManagement: () =>
                                    self.open((0, Ce.Um)().suggestionsSettings),
                                }))
                              ),
                              v.some(
                                F.B.getCardsViewModelSendToURLExperiment(ue, o)
                              ),
                              () => false,
                              ct.getActiveItemWithAlert,
                              ee,
                              ne,
                              ue,
                              {
                                bufferTransitions: true,
                                showGbPrompt: F.B.shouldShow(c.get()),
                              },
                              e.sduiManager,
                              void 0,
                              v.isSome(e.sduiManager)
                            ),
                            ge = j
                              ? () => {
                                  H.get() && H.set(false);
                                }
                              : void 0,
                            Je = new te(o, u, m, C, he.actionEvents, d, ge),
                            tt = new L._(Je, l, o),
                            it = new R.y(he.actionEvents, o, e.alertsReader),
                            at = new Ne.o(() => Ye.F2(void 0)),
                            st = H.pipe(ze.h(re.PU)),
                            rt = r
                              .view("user")
                              .pipe(oe.U((e) => e.premium))
                              .subscribe((e) => {
                                e && H.set(false);
                              }),
                            nt = (0, Ae.xl)(ne, W, st, H),
                            ot = (0, h.zG)(
                              ht.aj([
                                nt,
                                et.P.Filters.getBulkDismissAhiFilter(ne, ee),
                              ]),
                              oe.U(([e, t]) => (0, S.W9)(e, t))
                            ),
                            dt = new Ae.o$(
                              e.alertsList,
                              e.alertsReader,
                              e.positionManager,
                              e.alertsService,
                              t,
                              ne,
                              ot,
                              ct.getActiveItemWithAlert,
                              a,
                              true,
                              H
                            ),
                            ut = (0, ye.hp)(ne, dt, J, at, t, N),
                            pt = new Fe.mN(
                              t,
                              ne,
                              dt,
                              e.alertsReader,
                              ct.getActiveItemWithAlert,
                              (t) => {
                                const i = t.reduce(
                                    (t, i) =>
                                      (0, h.zG)(
                                        e.alertsReader.getById(i.alert.id),
                                        v.chain(ae.bZ.getRawId),
                                        Z.bw((e) => t.set(e, i)),
                                        v.fold(
                                          () => t,
                                          () => t
                                        )
                                      ),
                                    new Map()
                                  ),
                                  a = Array.from(i.keys())
                                    .map(y.alerts.getAlertById)
                                    .filter(Ee.fQ);
                                if (a.length) {
                                  const e = a.reduce((e, t) =>
                                    f.S.ordering.greaterThanOrEqual(t, e)
                                      ? t
                                      : e
                                  );
                                  return v.fromNullable(
                                    i.get(Me.wQ.Id.create(e.id))
                                  );
                                }
                                return v.none;
                              }
                            ),
                            mt = new pe.x(e.alertsList, ne, 3),
                            gt = new G.B.ViewModel.UpgradeHookItemViewModelImpl(
                              he,
                              mt,
                              qe.C,
                              pe.L.Place.assistantCardList,
                              {
                                onShowUpgradeHook: () => {
                                  j && H.set(true),
                                    o.assistantExpandedUpgradeHookShow(
                                      (0, h.zG)(
                                        mt.advancedAlerts.get(),
                                        v.fold(
                                          () => 0,
                                          (e) => e.count
                                        )
                                      ),
                                      100
                                    );
                                },
                                onOpenUpgradeUrl: () =>
                                  o.getPremiumButtonClick(
                                    "assistantList",
                                    "SeeWhatsInPremium"
                                  ),
                                onDismissUpgradeHook: () => {
                                  H.set(false);
                                },
                              }
                            ),
                            vt = new fe(
                              e.alertsReader,
                              e.alertsList.state,
                              () =>
                                v.fromNullable(
                                  null == _ ? void 0 : _.sessionUuid
                                ),
                              o,
                              T,
                              O,
                              ne,
                              mt,
                              Je,
                              ct.getActiveItemWithAlert,
                              c.get().isPremium
                            ),
                            ft = new ce(
                              ne,
                              e.alertsReader,
                              y,
                              ct.getActiveItemWithAlert
                            ),
                            wt = T.getTreatment(
                              me.p.SingleCardAssistantUpHookFormats
                            ),
                            bt = v.isSome(e.sduiManager)
                              ? new lt(e.sduiManager.value, he, ne)
                              : null,
                            St = [
                              (0, _e.A7)(pt, ne, j),
                              (0, h.zG)(
                                We.EQ.focusMarkByActiveAlert(
                                  ne,
                                  dt,
                                  e.alertsReader,
                                  ct.getActiveFocusableItem,
                                  N.getLogger(
                                    "MarksEffects.focusMarkByActiveAlert"
                                  )
                                ),
                                z.nL.Effect.Producer.delayed(a)
                              ),
                              (0, B.yS)(
                                dt.events,
                                ee,
                                N.getLogger("createOnAlertApplySideEffect")
                              ),
                              ...he.getApplicatorEffects(),
                              (0, h.zG)(
                                (0, ye.k9)(
                                  ne,
                                  ut,
                                  le.h.create(v.none),
                                  ct.getActiveAlignableItem,
                                  ee
                                ),
                                z.nL.Effect.Producer.delayed(a)
                              ),
                              Ve.dv.createSendActiveAlertFeedbacksEffect(
                                ne,
                                ct.getActiveItemWithAlert,
                                e.alertsService,
                                e.alertsReader,
                                N.getLogger(
                                  "CardsViewModelEffects.createSendActiveAlertFeedbacksEffect"
                                )
                              ),
                              Re.N.PrevNextNavigation.sideEffect(
                                Re.N.PrevNextNavigation.Events.fromCardActions(
                                  he.actionEvents
                                ),
                                ne,
                                ee
                              ),
                              et.P.SideEffects.createSDUIFeedSideEffect(
                                (0, h.zG)(
                                  e.sduiManager,
                                  v.map((e) => e.state)
                                ),
                                ee
                              ),
                              G.B.getSideEffect(
                                G.B.getPremiumAlerts(e.alertsList.state, ne),
                                ne,
                                gt.upgradeHookDismissed,
                                ee,
                                U.IG.Default,
                                G.B.ItemFactory.create(U.IG.Default),
                                A(wt)
                              ),
                              vt.getJumpToToneSuggestionSideEffect(),
                              ...(null !== bt
                                ? [
                                    $e.SideEffects.AddBulkDismissBufferCard.create(
                                      bt
                                    ),
                                    $e.SideEffects.RemoveBulkDismissBufferCard.create(
                                      bt
                                    ),
                                    $e.SideEffects.RemoveBulkDismiss.create(
                                      bt,
                                      (e) => he.actionEvents.next(e)
                                    ),
                                    $e.SideEffects.FocusBulkDismiss.create(
                                      bt,
                                      ne,
                                      ee
                                    ),
                                  ]
                                : []),
                            ],
                            yt = le.h.create(Te.R.SpecialId.AllAlerts),
                            _t = le.h.create(s),
                            kt = (e) =>
                              (0, h.zG)(
                                _t.get(),
                                v.chain(
                                  (t) => (
                                    _t.set(v.none),
                                    z.nL.hasCards(e)
                                      ? (0, h.zG)(
                                          e.currentLens.items.reduce(
                                            (e, i) =>
                                              (0, h.zG)(
                                                e,
                                                v.alt(() =>
                                                  (0, h.zG)(
                                                    i,
                                                    v.fromPredicate(
                                                      ct.isAlertRefSDUI
                                                    ),
                                                    v.chain((e) =>
                                                      v.fromNullable(
                                                        e.alerts.find((e) =>
                                                          e.id.startsWith(
                                                            t + "_"
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              ),
                                            v.none
                                          ),
                                          v.map((t) => ({
                                            alert: t,
                                            highlightIndex: 0,
                                            lensId: e.currentLens.id,
                                          }))
                                        )
                                      : v.none
                                  )
                                )
                              ),
                            At = (0, h.zG)(
                              [
                                (0, h.zG)(
                                  (0, S.W9)(
                                    () => v.isSome(_t.get()),
                                    Oe.Py.whenNoActiveCard
                                  ),
                                  Oe.Py.behaviorToEffect((e) =>
                                    (0, h.zG)(
                                      e,
                                      kt,
                                      v.map(
                                        z.nL.Effect.FocusBehavior.focusAlert
                                      )
                                    )
                                  )
                                ),
                                (0, h.zG)(
                                  (0, S.Kg)(
                                    Oe.Py.whenNoActiveCard,
                                    Oe.Py.whenShouldVerifyCurrentLens(
                                      ct.getActiveItemWithAlert,
                                      ee
                                    )
                                  ),
                                  Oe.Py.behaviorToEffect(() =>
                                    v.some(z.nL.Effect.FocusBehavior.focusNext)
                                  )
                                ),
                              ],
                              (0, g.fold)(
                                (0, g.getFunctionMonoid)(v.getFirstMonoid())()
                              )
                            ),
                            Ct = (0, Oe.VC)(
                              se,
                              de,
                              yt,
                              ee,
                              q.v.WithSuccess.State.isInGlobalSuccess(ee),
                              h.jv
                            ),
                            Et = (0, Oe.Dv)(
                              (e) => Te.R.isMainLens(e.currentLens.id),
                              Ct,
                              ee
                            ),
                            It = Oe.Py.getStateTransformer(
                              At,
                              Et,
                              e.alertsReader,
                              ee,
                              Oe.Py.getShouldAutoFocusSDUI(),
                              h.Q1,
                              yt,
                              Oe.Py.getSDUITransitions
                            ),
                            Mt =
                              q.v.Items.getSingleItemFeedPositionsUpdateTransformer(
                                ee
                              ),
                            Tt =
                              q.v.Items.getRemoveDisposedItemsTransformer(ee),
                            xt = Le.i.DisablePrevNextButtons.create(ee),
                            Rt = (0, h.ls)(It, Xe.L9(Tt), Xe.L9(xt), Xe.L9(Mt)),
                            Lt = new Ue.l(
                              ne,
                              se,
                              e.alertsReader,
                              e.alertsService,
                              St,
                              ct.getActiveItemWithAlert,
                              Rt
                            ),
                            Ft = new V.X(r, n, l),
                            Pt = he.actionEvents.subscribe(
                              (0, h.ls)(
                                (0, w.JH)(
                                  e.alertsReader,
                                  w.SV.Source.assistant
                                ),
                                Z.bw(
                                  async (e) => (
                                    e.kind === w.SV.Kind.alertApply &&
                                      e.source === w.SV.Source.assistant &&
                                      (await x.incrementCounter()),
                                    k.next(e)
                                  )
                                )
                              )
                            ),
                            Vt = (0, P.W)(b),
                            Bt = I.pipe(
                              Ke.w(
                                v.fold(
                                  () => Ze.E,
                                  (t) =>
                                    t.initSingleCardAssistantActionsProcessing(
                                      e.alertsReader,
                                      (0, p.X5)(pt, ne)
                                    )
                                )
                              )
                            ).subscribe(),
                            Ot = ct.item,
                            Nt = ne.lens(z.nL.Prism.getLens());
                          return {
                            checksFeedItem: Ot,
                            checksFeedFlow: () => ct.createCardListFlow(Nt, ee),
                            checksFeedIsInSuccess: (e) =>
                              q.v.WithSuccess.State.isInSuccess(ee)(e),
                            lensState: ne,
                            cardsViewModel: he,
                            lensPreviewViewModel: X,
                            cardsListScrollManager: at,
                            alertProcessor: y,
                            checkingService: _,
                            assistantLayoutViewModel: Je,
                            assistantFeedbackViewModel: tt,
                            assistantSettingsViewModel: Ft,
                            marksViewModel: dt,
                            upgradeViewModel: mt,
                            upgradeHookItemViewModel: gt,
                            gnar: o,
                            user: c,
                            positionViewModel: Vt,
                            remSize: J,
                            isSingleCardAssistant: true,
                            statisticsService: E,
                            toneDetectorViewModel: vt,
                            learnMoreViewModel: ft,
                            closeAssistant: d,
                            bulkDismissViewModel: bt,
                            dispose: () => {
                              Pt.unsubscribe(),
                                rt.unsubscribe(),
                                he.dispose(),
                                Je.dispose(),
                                Lt.dispose(),
                                dt.dispose(),
                                K.unsubscribe(),
                                it.dispose(),
                                Bt.unsubscribe(),
                                ft.dispose(),
                                vt.dispose(),
                                null == bt || bt.dispose();
                            },
                          };
                        })(
                          l.engine,
                          l.denaliViewAdapter,
                          o.sidebarEvents,
                          this._assistantPopupIsReady,
                          (0, n.pipe)(
                            v.fromNullable(e),
                            v.map(Me.wQ.Id.create)
                          ),
                          this._params.contentScriptState,
                          this._params.contentScriptActions,
                          this._params.gnar,
                          this._params.domain,
                          s,
                          this.close,
                          this._params.assistantService
                            .selectedHighlightsTracker,
                          this._params.assistantService.isTextFieldEmpty,
                          this._params.assistantService.positionModel,
                          this._params.alertProcessor,
                          this._params.checkingService,
                          this._params.cardEvents,
                          this._params.browser,
                          this._params.statisticsService,
                          this._params.toneAIFeature,
                          this._params.envFactory,
                          this._params.experimentClient,
                          this._params.userEngagedByAlertsAcceptedService,
                          this._params.emogenieService
                        )
                      : c === dr.Wz.v1
                      ? ((
                          e,
                          t,
                          i,
                          a,
                          s,
                          r,
                          n,
                          o,
                          l,
                          c,
                          d,
                          u,
                          m,
                          b,
                          y,
                          _,
                          k,
                          C,
                          E,
                          I,
                          M,
                          T,
                          O,
                          N
                        ) => {
                          const D = Qe.C8.Logging.getLogger(
                              "SingleCardAssistant.ViewModels.V1"
                            ),
                            H = le.h.create(xe.A.defaultState),
                            j = le.h.create(false),
                            W = (0, we.z)(r.view("user").get(), T),
                            K = Pe.t.create(Pe.t.defaultLensFilters, {
                              ...Pe.t.defaultTextFilters,
                              [Te.R.SpecialId.Closed]: h.jv,
                              [Te.R.SpecialId.AllAlerts]:
                                ae.bZ.belongsToAllAlerts,
                            }),
                            X = xe.A.get(
                              e.alertsList.state,
                              e.alertsList.lensesScores,
                              K
                            ).subscribe(re.wW(H)),
                            Y = new ke.t(
                              H.view("lenses"),
                              K,
                              e.sessionModel.scoreStatus
                            ),
                            Q = (0, Be.$y)((0, Ie.a)(t).getContents),
                            $ = {
                              features: new Set([
                                U.IG.Features.showCardLabelInOutcomes,
                              ]),
                              cardLayoutDensityMode: De.j.Density.minimal,
                              shouldAnimateAlertApply:
                                U.IG.Default.shouldAnimateAlertApply,
                              cardVisualMode: le.h.create(
                                De.j.CardVisualMode.RegularLightMode
                              ),
                            },
                            J = (0, U.Ls)(
                              Q,
                              e.alertsReader,
                              $,
                              () => Ge.of(v.none),
                              e.mutingAlertsReader
                            ),
                            ee = le.h.create(16),
                            ie = x.getCapabilities(J, e.alertsReader),
                            se = new He.oq(
                              e.alertsList.state,
                              e.alertsReader,
                              H.view("lenses"),
                              e.positionManager,
                              Y,
                              new je.gi(x.equatable.structEq, x.defaultOrd),
                              (0, je.is)(J, ie),
                              ie,
                              K
                            ),
                            ne = le.h.create(
                              se
                                .emptyState(Te.R.SpecialId.AllAlerts)
                                .patch({ alertSource: ae.l$.sidebar })
                            );
                          i.next({
                            kind: be.R.ChangeLens,
                            selectedLens: "all",
                          });
                          const de = (0, Oe.u0)(() => t.getCursor().index, se),
                            ue = new Se.C(M()),
                            he = new Ve.Xx(
                              { flush: () => t.flushChanges() },
                              new ve.xQ(),
                              J,
                              e.alertsService,
                              e.sduiService,
                              () => Promise.resolve(),
                              () => Promise.resolve(),
                              (0, h.zG)(
                                e.mutedAlertsCategoriesModel,
                                v.map((e) => ({
                                  model: e,
                                  openSuggestionsManagement: () =>
                                    self.open((0, Ce.Um)().suggestionsSettings),
                                }))
                              ),
                              v.some(
                                F.B.getCardsViewModelSendToURLExperiment(ue, o)
                              ),
                              () => false,
                              x.getActiveItemWithAlert,
                              ie,
                              ne,
                              ue,
                              {
                                bufferTransitions: true,
                                showGbPrompt: F.B.shouldShow(c.get()),
                              }
                            ),
                            ge = W
                              ? () => {
                                  j.get() && j.set(false);
                                }
                              : void 0,
                            $e = new te(o, u, m, C, he.actionEvents, d, ge),
                            Je = new L._($e, l, o),
                            et = new R.y(he.actionEvents, o, e.alertsReader),
                            tt = new Ne.o(() => Ye.F2(void 0)),
                            it = j.pipe(ze.h(re.PU)),
                            at = r
                              .view("user")
                              .pipe(oe.U((e) => e.premium))
                              .subscribe((e) => {
                                e && j.set(false);
                              }),
                            st = (0, Ae.xl)(ne, K, it, j),
                            rt = new Ae.o$(
                              e.alertsList,
                              e.alertsReader,
                              e.positionManager,
                              e.alertsService,
                              t,
                              ne,
                              st,
                              x.getActiveItemWithAlert,
                              a,
                              true,
                              j
                            ),
                            nt = (0, ye.hp)(ne, rt, ee, tt, t, D),
                            ot = new Fe.mN(
                              t,
                              ne,
                              rt,
                              e.alertsReader,
                              x.getActiveItemWithAlert,
                              (t) => {
                                const i = t.reduce(
                                    (t, i) =>
                                      (0, h.zG)(
                                        e.alertsReader.getById(i.alert.id),
                                        v.chain(ae.bZ.getRawId),
                                        Z.bw((e) => t.set(e, i)),
                                        v.fold(
                                          () => t,
                                          () => t
                                        )
                                      ),
                                    new Map()
                                  ),
                                  a = Array.from(i.keys())
                                    .map(y.alerts.getAlertById)
                                    .filter(Ee.fQ);
                                if (a.length) {
                                  const e = a.reduce((e, t) =>
                                    f.S.ordering.greaterThanOrEqual(t, e)
                                      ? t
                                      : e
                                  );
                                  return v.fromNullable(
                                    i.get(Me.wQ.Id.create(e.id))
                                  );
                                }
                                return v.none;
                              }
                            ),
                            lt = new pe.x(e.alertsList, ne, 3),
                            ct = new G.B.ViewModel.UpgradeHookItemViewModelImpl(
                              he,
                              lt,
                              qe.C,
                              pe.L.Place.assistantCardList,
                              {
                                onShowUpgradeHook: () => {
                                  W && j.set(true),
                                    o.assistantExpandedUpgradeHookShow(
                                      (0, h.zG)(
                                        lt.advancedAlerts.get(),
                                        v.fold(
                                          () => 0,
                                          (e) => e.count
                                        )
                                      ),
                                      100
                                    );
                                },
                                onOpenUpgradeUrl: () =>
                                  o.getPremiumButtonClick(
                                    "assistantList",
                                    "SeeWhatsInPremium"
                                  ),
                                onDismissUpgradeHook: () => {
                                  j.set(false);
                                },
                              }
                            ),
                            dt = new fe(
                              e.alertsReader,
                              e.alertsList.state,
                              () =>
                                v.fromNullable(
                                  null == _ ? void 0 : _.sessionUuid
                                ),
                              o,
                              T,
                              N,
                              ne,
                              lt,
                              $e,
                              x.getActiveItemWithAlert,
                              c.get().isPremium
                            ),
                            ut = new ce(
                              ne,
                              e.alertsReader,
                              y,
                              x.getActiveItemWithAlert
                            ),
                            pt = T.getTreatment(
                              me.p.SingleCardAssistantUpHookFormats
                            ),
                            mt = [
                              (0, _e.A7)(ot, ne, W),
                              (0, h.zG)(
                                We.EQ.focusMarkByActiveAlert(
                                  ne,
                                  rt,
                                  e.alertsReader,
                                  x.getActiveFocusableItem,
                                  D.getLogger(
                                    "MarksEffects.focusMarkByActiveAlert"
                                  )
                                ),
                                z.nL.Effect.Producer.delayed(a)
                              ),
                              (0, B.yS)(
                                rt.events,
                                ie,
                                D.getLogger("createOnAlertApplySideEffect")
                              ),
                              ...he.getApplicatorEffects(),
                              (0, h.zG)(
                                (0, ye.k9)(
                                  ne,
                                  nt,
                                  le.h.create(v.none),
                                  x.getActiveAlignableItem,
                                  ie
                                ),
                                z.nL.Effect.Producer.delayed(a)
                              ),
                              Ve.dv.createSendActiveAlertFeedbacksEffect(
                                ne,
                                x.getActiveItemWithAlert,
                                e.alertsService,
                                e.alertsReader,
                                D.getLogger(
                                  "CardsViewModelEffects.createSendActiveAlertFeedbacksEffect"
                                )
                              ),
                              Re.N.PrevNextNavigation.sideEffect(
                                Re.N.PrevNextNavigation.Events.fromCardActions(
                                  he.actionEvents
                                ),
                                ne,
                                ie
                              ),
                              G.B.getSideEffect(
                                G.B.getPremiumAlerts(e.alertsList.state, ne),
                                ne,
                                ct.upgradeHookDismissed,
                                ie,
                                U.IG.Default,
                                G.B.ItemFactory.create(U.IG.Default),
                                A(pt)
                              ),
                              dt.getJumpToToneSuggestionSideEffect(),
                            ],
                            ht = le.h.create(Te.R.SpecialId.AllAlerts),
                            gt = le.h.create(s),
                            vt = (e) => {
                              const t = (0, v.fromPredicate)(
                                (0, S.Kg)(x.isAlertCard)
                              );
                              return (0, h.zG)(
                                gt.get(),
                                v.chain(
                                  (i) => (
                                    gt.set(v.none),
                                    z.nL.hasCards(e)
                                      ? (0, h.zG)(
                                          e.currentLens.items.reduce(
                                            (e, a) =>
                                              (0, h.zG)(
                                                e,
                                                v.alt(() =>
                                                  (0, h.zG)(
                                                    a,
                                                    t,
                                                    v.chain((e) =>
                                                      v.fromNullable(
                                                        e.alerts.find((e) =>
                                                          e.id.startsWith(
                                                            i + "_"
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              ),
                                            v.none
                                          ),
                                          v.map((t) => ({
                                            alert: t,
                                            highlightIndex: 0,
                                            lensId: e.currentLens.id,
                                          }))
                                        )
                                      : v.none
                                  )
                                )
                              );
                            },
                            ft = (0, h.zG)(
                              [
                                (0, h.zG)(
                                  (0, S.W9)(
                                    () => v.isSome(gt.get()),
                                    Oe.Py.whenNoActiveCard
                                  ),
                                  Oe.Py.behaviorToEffect((e) =>
                                    (0, h.zG)(
                                      e,
                                      vt,
                                      v.map(
                                        z.nL.Effect.FocusBehavior.focusAlert
                                      )
                                    )
                                  )
                                ),
                                (0, h.zG)(
                                  (0, S.Kg)(
                                    Oe.Py.whenNoActiveCard,
                                    Oe.Py.whenShouldVerifyCurrentLens(
                                      x.getActiveItemWithAlert,
                                      ie
                                    )
                                  ),
                                  Oe.Py.behaviorToEffect(() =>
                                    v.some(z.nL.Effect.FocusBehavior.focusNext)
                                  )
                                ),
                              ],
                              (0, g.fold)(
                                (0, g.getFunctionMonoid)(v.getFirstMonoid())()
                              )
                            ),
                            wt = (0, Oe.VC)(
                              se,
                              de,
                              ht,
                              ie,
                              q.v.WithSuccess.State.isInGlobalSuccess(ie),
                              h.jv
                            ),
                            bt = (0, Oe.Dv)(
                              (e) => Te.R.isMainLens(e.currentLens.id),
                              wt,
                              ie
                            ),
                            St = Oe.Py.getStateTransformer(
                              ft,
                              bt,
                              e.alertsReader,
                              ie,
                              h.W8,
                              h.Q1,
                              ht,
                              Oe.Py.getSDUITransitions
                            ),
                            yt =
                              q.v.Items.getSingleItemFeedPositionsUpdateTransformer(
                                ie
                              ),
                            _t =
                              q.v.Items.getRemoveDisposedItemsTransformer(ie),
                            kt = Le.i.DisablePrevNextButtons.create(ie),
                            At = (0, h.ls)(St, Xe.L9(_t), Xe.L9(kt), Xe.L9(yt)),
                            Ct = new Ue.l(
                              ne,
                              se,
                              e.alertsReader,
                              e.alertsService,
                              mt,
                              x.getActiveItemWithAlert,
                              At
                            ),
                            Et = new V.X(r, n, l),
                            It = he.actionEvents.subscribe(
                              (0, h.ls)(
                                (0, w.JH)(
                                  e.alertsReader,
                                  w.SV.Source.assistant
                                ),
                                Z.bw(
                                  async (e) => (
                                    e.kind === w.SV.Kind.alertApply &&
                                      e.source === w.SV.Source.assistant &&
                                      (await O.incrementCounter()),
                                    k.next(e)
                                  )
                                )
                              )
                            ),
                            Mt = (0, P.W)(b),
                            Tt = I.pipe(
                              Ke.w(
                                v.fold(
                                  () => Ze.E,
                                  (t) =>
                                    t.initSingleCardAssistantActionsProcessing(
                                      e.alertsReader,
                                      (0, p.X5)(ot, ne)
                                    )
                                )
                              )
                            ).subscribe(),
                            xt = x.item,
                            Rt = ne.lens(z.nL.Prism.getLens());
                          return {
                            checksFeedItem: xt,
                            checksFeedFlow: () => x.createCardListFlow(Rt, ie),
                            checksFeedIsInSuccess: (e) =>
                              q.v.WithSuccess.State.isInSuccess(ie)(e),
                            lensState: ne,
                            cardsViewModel: he,
                            lensPreviewViewModel: Y,
                            cardsListScrollManager: tt,
                            alertProcessor: y,
                            checkingService: _,
                            assistantLayoutViewModel: $e,
                            assistantFeedbackViewModel: Je,
                            assistantSettingsViewModel: Et,
                            marksViewModel: rt,
                            upgradeViewModel: lt,
                            upgradeHookItemViewModel: ct,
                            gnar: o,
                            user: c,
                            positionViewModel: Mt,
                            remSize: ee,
                            isSingleCardAssistant: true,
                            statisticsService: E,
                            toneDetectorViewModel: dt,
                            learnMoreViewModel: ut,
                            closeAssistant: d,
                            bulkDismissViewModel: null,
                            dispose: () => {
                              It.unsubscribe(),
                                at.unsubscribe(),
                                he.dispose(),
                                $e.dispose(),
                                Ct.dispose(),
                                rt.dispose(),
                                X.unsubscribe(),
                                et.dispose(),
                                Tt.unsubscribe(),
                                ut.dispose(),
                                dt.dispose();
                            },
                          };
                        })(
                          l.engine,
                          l.denaliViewAdapter,
                          o.sidebarEvents,
                          this._assistantPopupIsReady,
                          (0, n.pipe)(
                            v.fromNullable(e),
                            v.map(Me.wQ.Id.create)
                          ),
                          this._params.contentScriptState,
                          this._params.contentScriptActions,
                          this._params.gnar,
                          this._params.domain,
                          s,
                          this.close,
                          this._params.assistantService
                            .selectedHighlightsTracker,
                          this._params.assistantService.isTextFieldEmpty,
                          this._params.assistantService.positionModel,
                          this._params.alertProcessor,
                          this._params.checkingService,
                          this._params.cardEvents,
                          this._params.browser,
                          this._params.statisticsService,
                          this._params.toneAIFeature,
                          this._params.envFactory,
                          this._params.experimentClient,
                          this._params.userEngagedByAlertsAcceptedService,
                          this._params.emogenieService
                        )
                      : (0, p.n)(
                          l.engine,
                          l.denaliViewAdapter,
                          l.document.settings.lens("selectedLens"),
                          this._params.emogenieService,
                          v.fromNullable(this._params.readersAttentionFeature),
                          this._params.shortenItFeature,
                          this._params.toneAIFeature,
                          this._params.ethicalAIFeature,
                          this._params.snippetsFeature,
                          v.fromNullable(this._params.proofitFeature),
                          o.sidebarEvents,
                          this._assistantPopupIsReady,
                          (0, n.pipe)(
                            v.fromNullable(e),
                            v.map(Me.wQ.Id.create)
                          ),
                          this._params.contentScriptState,
                          this._params.contentScriptActions,
                          this._params.gnar,
                          this._params.statisticsService,
                          this._params.domain,
                          s,
                          this.close,
                          this._params.assistantService
                            .selectedHighlightsTracker,
                          this._params.assistantService.isTextFieldEmpty,
                          this._params.assistantService.positionModel,
                          this._params.alertProcessor,
                          this._params.cardEvents,
                          this._params.browser,
                          this._params.layout.assistant,
                          this._params.envFactory,
                          this._params.experimentClient,
                          this._params.userEngagedByAlertsAcceptedService
                        );
                vr(false, d, t),
                  (this._initPerformance = r.endMeasure()),
                  this._viewModels.set(d);
              }
            }),
            (this.close = () => {
              var e, t, i, a;
              null !== this._viewModels.get() &&
                (this._trackAssistantClose(),
                null === (t = (e = this._params).onClose) ||
                  void 0 === t ||
                  t.call(e),
                this._openState.set("closed"),
                null === (i = this._integration) || void 0 === i || i.dispose(),
                (this._integration = null),
                null === (a = this._viewModels.get()) ||
                  void 0 === a ||
                  a.dispose(),
                this._viewModels.set(null));
            }),
            (this._asyncReadyCbSub = null),
            (this._getReadyFn = () => {
              const e = this._felog.renderTime.startMeasure();
              return (t, i, a) => {
                const s = e.endMeasure();
                let r;
                if (
                  ((0, K.kG)(
                    !!this._openMeasure,
                    "Expected Assistant to be open"
                  ),
                  a)
                )
                  this._openMeasure.cancelMeasure();
                else {
                  const e = this._openMeasure.endMeasure();
                  (r = null == e ? void 0 : e.duration),
                    e &&
                      e.duration > 500 &&
                      this._log.warn("assistant popup took too long to open:", {
                        init: this._initPerformance.duration,
                        render: s.duration,
                        total: e.duration,
                      });
                }
                this._asyncReadyCbSub = pr.E.schedule(() => {
                  this._openState.set("open"),
                    this._assistantPopupIsReady.next(),
                    this._trackAssistantOpen(t, r),
                    this._trackAssistantDrag(t, i);
                });
              };
            }),
            (this._applyIframeOffset = (e) => {
              var t, i;
              const a =
                null === (i = (t = this._params).getCustomOffset) ||
                void 0 === i
                  ? void 0
                  : i.call(t);
              return a
                ? {
                    ...e,
                    size: { width: a.width, height: a.height },
                    client: {
                      ...e.client,
                      left: a.left + e.client.left,
                      top: a.top + e.client.top,
                    },
                    offset: {
                      ...e.offset,
                      left: a.left + e.offset.left,
                      top: a.top + e.offset.top,
                    },
                    page: {
                      ...e.page,
                      left: a.left + e.page.left,
                      top: a.top + e.page.top,
                    },
                  }
                : e;
            });
        }
        get view() {
          return this._viewModels.pipe(
            Ke.w((e) =>
              null === e
                ? Ge.of(null)
                : mr.R(self, "resize").pipe(
                    Mt.O(null),
                    at.M(this._params.layout.textField.rect.behavior),
                    at.M(
                      ht
                        .aj([
                          this._params.layout.gbutton.positionBehavior,
                          this._params.layout.gbutton.sizeBehavior,
                        ])
                        .pipe(
                          oe.U(([e, t]) => {
                            const i = t.draggable ? t.width : t.heightAndWidth,
                              a = t.draggable ? t.height : t.heightAndWidth;
                            return {
                              top: e.draggable
                                ? e.client.top
                                : e.client.top - a,
                              left: e.draggable
                                ? e.client.left
                                : e.client.left - i,
                              width: i,
                              height: a,
                            };
                          })
                        )
                    ),
                    oe.U(([[t, i], a]) => {
                      const s = this._applyIframeOffset(i),
                        r = this._getReadyFn();
                      return e.isSingleCardAssistant
                        ? o.createElement(
                            Bs,
                            {
                              gbuttonRect: a,
                              viewModels: e,
                              onDomRectChange: (e) => this._domRect.set(e),
                            },
                            o.createElement(lr, {
                              viewModels: e,
                              height: this._height,
                              ready: r,
                              domRect: this._domRect.view(),
                            })
                          )
                        : o.createElement(
                            Vs,
                            {
                              textFieldRect: s,
                              gButtonRect: a,
                              viewModels: e,
                              draggableGButtonType:
                                this._params.draggableGButtonType,
                            },
                            o.createElement(Rs, {
                              viewModels: e,
                              emogenieService: this._params.emogenieService,
                              height: (0, d.Y)(e, s).pipe(
                                hr.R(
                                  this._assistantPopupIsReady.asObservable()
                                ),
                                Cs.b(re.wW(this._height))
                              ),
                              ready: r,
                              OuterElementsPortalSource:
                                this._params.OuterElementsPortalSource,
                            })
                          );
                    })
                  )
            )
          );
        }
        get activeView() {
          return this._viewModels.pipe(
            Ke.w((e) => {
              var t;
              return null !==
                (t =
                  null == e ? void 0 : e.assistantLayoutViewModel.activeView) &&
                void 0 !== t
                ? t
                : Ge.of(null);
            })
          );
        }
        dispose() {
          var e;
          this.close(),
            this._subs.dispose(),
            null === (e = this._asyncReadyCbSub) ||
              void 0 === e ||
              e.unsubscribe();
        }
        _trackAssistantOpen(e, t) {
          var i, a;
          const s = this._viewModels.get();
          if (null !== s) {
            const r = s.isSingleCardAssistant
                ? { top: 0, left: 0 }
                : s.positionViewModel.initialPositionOffset,
              { statisticsService: n } = this._params,
              o = n.alertCounts.get(),
              l =
                0 === r.top && 0 === r.left
                  ? ["default", "single-card-assistant"].includes(
                      s.assistantLayoutViewModel.layout.name
                    )
                    ? "smart"
                    : "hardcoded"
                  : "sticky",
              c = s.assistantLayoutViewModel.activeView.get();
            this._params.gnar.assistantPopupShow(
              c.type,
              this._height.get(),
              e.get().left,
              e.get().top,
              o.expandedViewSupported,
              o.freeClarity,
              o.critical,
              o.filter((e) => "priority" === e.assistantView)
                .expandedViewSupported,
              n.wordsCount.get(),
              l,
              null !==
                (a =
                  null === (i = this._params.checkingService) || void 0 === i
                    ? void 0
                    : i.sessionUuid) && void 0 !== a
                ? a
                : "",
              c.type === m.aH.Type.popup ? c.popupType : void 0,
              t,
              n.generalScore.get()
            );
          }
        }
        _trackAssistantClose() {
          var e;
          const { statisticsService: t } = this._params,
            i = t.alertCounts.get(),
            a = (null === (e = this._viewModels.get()) || void 0 === e
              ? void 0
              : e.assistantLayoutViewModel.activeView.get()) || {
              type: m.aH.Type.default,
            };
          this._params.gnar.assistantPopupCloseButtonClick(
            a.type,
            i.expandedViewSupported,
            i.freeClarity,
            i.critical,
            i.filter((e) => "priority" === e.assistantView)
              .expandedViewSupported,
            a.type === m.aH.Type.popup ? a.popupType : void 0
          );
        }
        _trackAssistantDrag(e, t) {
          const i = e.get();
          let a = i;
          this._subs.push(
            t
              .pipe(
                si.G(),
                J.h(([e, t]) => e && !t)
              )
              .subscribe(() => {
                const t = e.get();
                Fs.E9.l1Distance(t, a) < 10 ||
                  (this._params.gnar.assistantPopupDrag(
                    t.left,
                    t.top,
                    this._height.get(),
                    i.left,
                    i.top
                  ),
                  (a = t));
              })
          );
        }
      }
      function vr(e, t, i) {
        i.caller === c.Rx.emogenie
          ? t.assistantLayoutViewModel.pushActiveView({
              type: m.aH.Type.emogenie,
            })
          : t.isSingleCardAssistant
          ? t.assistantLayoutViewModel.pushActiveView({
              type: m.aH.Type.default,
            })
          : t.isSingleCardAssistant ||
            (i.caller === c.Rx.proofitRequest
              ? t.assistantLayoutViewModel.pushActiveView({
                  type: m.aH.Type.proofitRequest,
                })
              : i.caller === c.Rx.proofitReview
              ? t.assistantLayoutViewModel.pushActiveView({
                  type: m.aH.Type.proofitReview,
                })
              : e || i.caller !== c.Rx.popupOpener
              ? t.assistantLayoutViewModel.pushActiveView({
                  type: m.aH.Type.default,
                })
              : t.assistantLayoutViewModel.pushActiveView({
                  type: m.aH.Type.popup,
                  popupType: i.popupType,
                }));
      }
      !(function (e) {
        e.Mock = class extends gr {
          constructor(e, t) {
            super(e, t),
              (this.debugView = this._viewModels.pipe(
                Ke.w((e) => {
                  if (null !== e) {
                    this._getReadyFn()(
                      le.h.create(Fs.E9.create({ top: 0, left: 0 })),
                      Ge.of(false)
                    );
                  }
                  return Ge.of(null);
                })
              )),
              (this.viewModels = this._viewModels.view());
          }
        };
      })(cr || (cr = {}));
      var fr = i(18126),
        wr = i(16037),
        br = i(64213),
        Sr = i(14568),
        yr = i(99015);
      class _r {
        constructor(e, t, i, a, s, r, n, o, l, c) {
          (this.connectionState = e),
            (this.gnar = t),
            (this.user = i),
            (this._hoverProvider = a),
            (this.document = s),
            (this.formattingService = r),
            (this.denaliViewAdapter = n),
            (this.capiProxy = o),
            (this.engine = l),
            (this.experimentClient = c),
            a.setAssistantHover(n.highlightHoverProvider);
        }
        static create(e) {
          var t;
          const i = new wr.t(
              e.highlights,
              e.textObserver,
              e.replacementService.get(),
              e.layout,
              e.scroller,
              e.selectedHighlightsTracker,
              void 0,
              e.requestAwaitService,
              null === (t = e.formattingService) || void 0 === t
                ? void 0
                : t.get()
            ),
            a = Sr.p.create(
              e.checkingService.get(),
              e.checkingServiceInitialState,
              e.alertsTransformer,
              e.alertProcessor,
              e.sidebarEvents
            ),
            s = (0, yr.r)(
              a,
              i,
              e.document.settings.lens("context"),
              () => {
                var t, i;
                return null !==
                  (i =
                    null === (t = e.getExistingAlerts) || void 0 === t
                      ? void 0
                      : t.call(e)) && void 0 !== i
                  ? i
                  : (0, br.q)(e.alertProcessor);
              },
              e.textObserver,
              () => e.checkingServiceInitialState.value.lastStart,
              e.readersAttentionFeature,
              e.shortenItFeature,
              e.snippetsFeature,
              e.getSduiProtocolVersion,
              e.sduiManagerFactory
            );
          return new _r(
            e.connectionState,
            e.gnar,
            e.user,
            e.hoverProvider,
            e.document,
            e.formattingService,
            i,
            a,
            s,
            e.experimentClient
          );
        }
        dispose() {
          this.capiProxy.dispose(),
            this.denaliViewAdapter.dispose(),
            this.engine.shutdown(),
            this._hoverProvider.removeAssistantHover();
        }
      }
      var kr = i(8467);
      class Ar {
        constructor({ layout: e }) {
          this._scroller = (0, kr.t)({
            scrollToMarkRect(t, i) {
              const a = e.textField.visibleRect.getApproximate();
              let s = ((i && i.paddingTop) || 0) - a.client.top;
              (s <= 0 || s >= a.size.height) && (s = a.size.height / 2);
              const r = t.top - s - a.client.top,
                n = t.right - t.left,
                o = Math.max(0, (a.size.width - n) / 2);
              t.left, a.client.left;
              requestAnimationFrame(() =>
                e.textField.scroller.scrollBy({ top: r, left: void 0 })
              );
            },
            scrollToRange() {},
          });
        }
        scrollToMark(e, t) {
          return this._scroller.scrollToMark(e, t);
        }
      }
      var Cr = i(50004);
      class Er {
        constructor(e) {
          (this._params = e),
            (this.sidebarEvents = new ve.xQ()),
            (this.hoverProvider = new fr.f(this._params.hoverProvider)),
            (this.selectedHighlightsTracker =
              this._params.highlights.getSelectedHighlightsTracker({
                textField: this._params.originalTextField,
                selectionService: this._params.selectionService,
              })),
            (this.positionModel = ((e, t, i, a) => {
              const s = t.view("page", "domain").get(),
                r = (0, Cr.U)(e, s),
                n = i.view(({ widgetOffset: e }) =>
                  null != e ? e : Fs.E9.zero
                );
              return {
                initialPositionOffset: n,
                updateInitialPositionOffset: (e) => {
                  Fs.E9.equals(e, n.get()) ||
                    a.field.patchFieldSettings({
                      fieldId: r,
                      fieldSettings: { widgetOffset: e },
                    });
                },
              };
            })(
              this._params.originalTextField,
              this._params.state,
              this._params.fieldSettings,
              this._params.actions
            )),
            (this.isTextFieldEmpty =
              this._params.textObserver.contentChanges.async.pipe(
                oe.U((e) => "" === e.newText.trim()),
                it.x()
              )),
            (this._checkingService = null);
        }
        setCheckingService(e) {
          this._checkingService = e;
        }
        getCheckingServiceState() {
          var e;
          return null === (e = this._checkingService) || void 0 === e
            ? void 0
            : e.state.value;
        }
        createIntegration(e) {
          const {
            layout: t,
            highlights: i,
            textObserver: a,
            replacementService: s,
            alertProcessor: r,
            state: n,
            alertsTransformer: o,
            document: l,
            requestAwaitService: c,
            formattingService: d,
            getCheckingServicePreviousState: u,
            createAssistantScroller: p = () => new Ar({ layout: t }),
            getExistingAlerts: m,
            sduiManagerFactory: h,
          } = this._params;
          if (null == this._checkingService) return null;
          const g = null == u ? void 0 : u();
          g && (this._checkingService.state.value = g);
          const v = p(),
            { user: f } = n.get();
          return _r.create({
            layout: t,
            alertProcessor: r,
            connectionState: n.view((e) => e.connection),
            highlights: i,
            textObserver: a,
            replacementService: s,
            checkingService: this._checkingService.lazyCheckingService,
            checkingServiceInitialState: this._checkingService.state,
            gnar: e.gnar,
            user: {
              isPremium: f.premium,
              isAnonymous: f.anonymous,
              experiments: f.experiments,
              customFields: f.customFields,
            },
            hoverProvider: this.hoverProvider,
            selectedHighlightsTracker: this.selectedHighlightsTracker,
            scroller: v,
            sidebarEvents: this.sidebarEvents,
            document: l,
            alertsTransformer: o,
            requestAwaitService: c,
            formattingService: d,
            getExistingAlerts: m,
            readersAttentionFeature: e.readersAttentionFeature,
            shortenItFeature: e.shortenItFeature,
            snippetsFeature: e.snippetsFeature,
            getSduiProtocolVersion: e.getSduiProtocolVersion,
            experimentClient: e.experimentClient,
            sduiManagerFactory: h,
          });
        }
        dispose() {
          var e;
          null === (e = this._checkingService) ||
            void 0 === e ||
            e.state.dispose();
        }
      }
    },
    99015: (e, t, i) => {
      i.d(t, { r: () => L });
      var a = i(57050),
        s = i(35214),
        r = i(40327),
        n = i(73353),
        o = i(21729),
        l = i(83078),
        c = i(51072),
        d = i(5114),
        u = i(38983);
      var p = i(80358),
        m = i(80800),
        h = i(84966),
        g = i(34101),
        v = i(6488),
        f = i(79227),
        w = i(16724),
        b = i(95362),
        S = i(5008),
        y = i(43320),
        _ = i(35301),
        k = i(85654),
        A = i(72720),
        C = i(55360),
        E = i(9922),
        I = i(98403),
        M = i(2834),
        T = i(78674),
        x = i(77176),
        R = i(71249);
      const L = (e, t, i, L, F, P, V, B, O, N, D) => {
        const U = new E.w.Keeper(),
          H = (function (e, t, i) {
            const s = u.h.create(d.none),
              p = u.h.create(d.none);
            return {
              score: u.h.create(d.none),
              scoreStatus: u.h.create(d.none),
              title: u.h.create(void 0),
              textInfo: u.h.create(d.none),
              checkingState: u.h.create(e.checkingState),
              asyncChecksState: u.h.create(e.asyncChecksState),
              context: i,
              contextCompleteness: i.view(o.j.calculateCompleteness),
              updateContext: (e) => {
                const t = !n.R$.eq.equals(i.get(), e);
                return i.set(e), t;
              },
              defaultContext: s,
              updateDefaultContext: (e) => {
                const t = !(0, r.pipe)(
                  (0, a.bc)([s.get(), e], l.vB(n.R$.eq.equals))
                );
                return s.set(e), t;
              },
              documentText: t.getText(),
              documentLength: u.h.create({
                full: t.getTextLength(),
                trimmed: t.getTextLength(),
              }),
              counters: u.h.create(o.dM.group.empty),
              calculateStats: () =>
                c.Vi(e.requestDocStats).then((e) => (p.set(d.some(e)), e)),
              recentDocumentStats: p,
            };
          })(e, t, i),
          j = (0, r.pipe)(
            N(),
            d.map(() => new A.Q(e))
          );
        U.push(
          e.events
            .pipe(
              M.b((t) => {
                H.checkingState.set(e.checkingState),
                  p.h.is("text_info")(t)
                    ? H.textInfo.set(d.some(t.data))
                    : p.h.is("finish")(t)
                    ? (H.score.set(t.score), H.scoreStatus.set(t.scoreStatus))
                    : p.h.is("feedback_ack")(t)
                    ? ((0, r.pipe)(
                        t,
                        d.fromPredicate(p.h.isUserFeedbackWithGeneralScore),
                        d.map((e) => e.outcomeScores.GeneralScore),
                        d.map((e) => Math.trunc(100 * e)),
                        l.bw((e) =>
                          H.score.modify(
                            (0, a.ls)(
                              d.map((t) => ({ ...t, rank: e })),
                              l.vx(d.some({ errorRateScore: 0, rank: e }))
                            )
                          )
                        )
                      ),
                      (0, r.pipe)(
                        t,
                        d.fromPredicate(p.h.isUserFeedbackWithScoreStatus),
                        d.map((e) => e.scoreStatus),
                        l.bw((e) => H.scoreStatus.set(d.some(e)))
                      ))
                    : p.h.is("session_started")(t) &&
                      H.updateDefaultContext(t.defaultDocumentContext);
              })
            )
            .subscribe(),
          F.contentChanges.async
            .pipe(
              T.b(300),
              x.U((e) => e.newText),
              x.U((e) => ({ full: e.length - 1, trimmed: e.trim().length })),
              M.b(I.wW(H.documentLength))
            )
            .subscribe()
        ),
          (0, r.pipe)(
            P(),
            d.map((e) => {
              H.updateDefaultContext(
                n.R$.parseDefault(e.defaultDocumentContext)
              );
            })
          );
        const W = new C.Xr(),
          G = new b.Ek(),
          z = (0, s.fold)((0, s.getEndomorphismMonoid)())(
            R.oA([
              d.fromNullable(
                null == V
                  ? void 0
                  : V.takeawaysFeedbackStore.addFeedbackToRawAlertTransformer
              ),
              d.some((e) =>
                (0, r.pipe)(
                  B.get(),
                  d.fold(
                    () => e,
                    (t) => t.addStateToRawAlertTransformer(e)
                  )
                )
              ),
              d.some((e) =>
                (0, r.pipe)(
                  O.get(),
                  d.fold(
                    () => e,
                    (t) => t.addSnippetsTriggerToAlert(e)
                  )
                )
              ),
            ])
          ),
          q = new g.a(),
          K = new w.SC(
            W,
            G,
            () => t.getContents().delta,
            e.events,
            e,
            H.counters,
            z,
            void 0,
            (0, r.pipe)(
              N(),
              d.map((e) => e === m.Wz.v1),
              d.getOrElseW(() => false)
            ),
            q
          ),
          Z = v.e.create(K.state),
          X = new f.k(Z, K._ops);
        U.push(
          y.R.init(
            y.R.UserTextChangesSync.create(t),
            e.events,
            S.n.ignoreTEResult(e),
            S.n.ignoreResult(W),
            G,
            S.A.merge([K])
          ).subscribe()
        ),
          e.loadAlerts(L()),
          K.flushAlerts();
        const Y = (0, r.pipe)(
            D,
            d.map((e) =>
              e.createSDUIManager(K.state, q.getByRawAlertId.bind(q))
            )
          ),
          Q = d.some(
            _.J.CategoriesModel.create(
              e.events,
              e,
              K.state,
              X,
              h.JW.ScopeType.GLOBAL
            )
          ),
          $ = d.some(k.k.create(Z));
        return {
          alertsList: K,
          alertsReader: Z,
          alertsService: X,
          positionManager: W,
          sessionModel: H,
          mutedAlertsCategoriesModel: Q,
          mutingAlertsReader: $,
          sduiService: j,
          shutdown: () => {
            K.dispose(), U.dispose();
          },
          sduiManager: Y,
        };
      };
    },
    32154: (e, t, i) => {
      i.d(t, { aU: () => at, X5: () => st, n: () => rt });
      var a,
        s = i(57050),
        r = i(35214),
        n = i(5114),
        o = i(40327),
        l = i(32281),
        c = i(50622),
        d = i(25913),
        u = i(9671),
        p = i(38152),
        m = i(51972),
        h = i(5178),
        g = i(19654),
        v = i(2844),
        f = i(75003),
        w = i(81301),
        b = i(9922),
        S = i(77176),
        y = i(28043),
        _ = i(16118),
        k = i(22232),
        A = i(83078),
        C = i(38983);
      !(function (e) {
        e.equals = (e, t) =>
          "score" in e && "score" in t
            ? e.score === t.score
            : e.type === t.type;
      })(a || (a = {}));
      class E {
        constructor(e, t, i, r, l, c) {
          (this._sessionModel = e),
            (this._layoutVM = t),
            (this._modalManager = i),
            (this._user = r),
            (this._gnar = l),
            (this._closeAssistant = c),
            (this.showSetGoalsActionButton = C.h.create(true)),
            (this.showSettingsActionButton = C.h.create(true)),
            (this.close = () => {
              this._closeAssistant();
            }),
            (this.score = v
              .aj([
                this._sessionModel.score.view(
                  n.map((e) => ({ capiScore: e.rank }))
                ),
                this._sessionModel.checkingState,
              ])
              .pipe(
                S.U(([e, t]) =>
                  (0, o.pipe)(
                    e,
                    n.map((e) => ({ ...e, isLoading: "idle" !== t }))
                  )
                )
              )),
            (this.summary = this._sessionModel.textInfo.view(
              (0, s.ls)(
                n.chain((e) => e.messages),
                n.map((e) => e.assistantHeader),
                n.getOrElse(() => "Looking good so far"),
                (e) => ({ content: e })
              )
            )),
            (this.logoScore = (0, v.aj)([
              this._layoutVM.activeView,
              this.score,
            ]).pipe(
              S.U(([e, t]) =>
                (0, o.pipe)(
                  t,
                  n.fold(
                    () => ({ type: "logo" }),
                    (t) =>
                      e.type !== f.aH.Type.default
                        ? { type: "logo" }
                        : { type: "score", score: t }
                  )
                )
              ),
              y.x(a.equals)
            )),
            (this.visibility = this._layoutVM.activeView.view((e) =>
              e.type === f.aH.Type.default ? "visible" : "hidden"
            )),
            (this._subs = new b.w.Keeper()),
            this._trackHeaderMessageChanges(),
            this._trackToShowActionButtons();
        }
        open(e) {
          if ("setGoals" === e)
            this._subs.push(
              this._modalManager.show(w.Iy.setGoals("user")).subscribe()
            );
          else (0, k.vE)(e);
        }
        _trackHeaderMessageChanges() {
          const e = this.summary.pipe(_.G()).subscribe(([e, t]) => {
            var i, a;
            this._gnar.assistantHeaderMessageUpdate(
              e.content,
              t.content,
              null ===
                (i = (0, o.pipe)(
                  this._sessionModel.textInfo.get(),
                  n.toUndefined
                )) || void 0 === i
                ? void 0
                : i.wordsCount,
              null ===
                (a = (0, o.pipe)(this._sessionModel.score.get(), A.Fc)) ||
                void 0 === a
                ? void 0
                : a.rank
            );
          });
          this._subs.push(e);
        }
        _trackToShowActionButtons() {
          const e = (0, v.aj)([
            this._layoutVM.activeView,
            this._user,
          ]).subscribe(([e, t]) => {
            t.isAnonymous || e.type === f.aH.Type.popup
              ? (this.showSetGoalsActionButton.set(false),
                this.showSettingsActionButton.set(false))
              : (this.showSetGoalsActionButton.set(true),
                this.showSettingsActionButton.set(true));
          });
          this._subs.push(e);
        }
        dispose() {
          this._subs.dispose();
        }
      }
      var I = i(59456),
        M = i(40033),
        T = i(66896),
        x = i(98403),
        R = i(31881);
      class L {
        constructor(e, t, i, a, s, r, l) {
          (this._lensPreviewVM = e),
            (this._layoutVM = t),
            (this._readersAttentionVM = i),
            (this._emogenieService = a),
            (this._session = s),
            (this._readersAttentionPredictionCardState = r),
            (this._gnar = l),
            (this._subs = new b.w.Keeper()),
            (this.previewState = C.h.create({ kind: M.fA.hidden })),
            (this.previewFlow = R.Z.fromSideEffect((e) => {
              switch (e.action.key) {
                case "tone":
                  const t = this._emogenieService.viewState
                    .view("prevalentEmotion")
                    .get();
                  return (
                    t && this._gnar.emogeniePredictionButtonClick(t.name),
                    this._layoutVM.pushActiveView({ type: f.aH.Type.emogenie })
                  );
                case "readersAttention":
                  return this._readersAttentionVM.openPanel({
                    type: f.aH.ReadersAttention.Caller.Type.predictionWidget,
                  });
                default:
                  (0, k.vE)(e.action);
              }
            }, this.previewState)),
            (this._previewState = (0, o.pipe)(
              v.aj([
                this._emogenieService.viewState.view((e) =>
                  n.fromNullable(
                    e.settings.hiddenReport ? void 0 : e.prevalentEmotion
                  )
                ),
                this._emogenieService.viewState.view("brandToneOffImageUrl"),
                this._readersAttentionPredictionCardState,
                this._session.documentLength,
                this._lensPreviewVM.getLens(T.R.SpecialId.PredictionEmogenie),
                this._lensPreviewVM.getLens(T.R.SpecialId.PredictionTakeaways),
              ]),
              S.U(([e, t, i, a, s, r]) =>
                (n.isSome(e) || n.isSome(i)) && a.trimmed > 0
                  ? {
                      kind: M.fA.visible,
                      tone: (0, o.pipe)(
                        e,
                        n.map((e) => ({
                          emotion: e,
                          alertsCount: s.count,
                          brandToneOffImageUrl: t,
                        }))
                      ),
                      readersAttention: (0, o.pipe)(
                        i,
                        n.map((e) => ({
                          ...e,
                          alertsCount: (0, o.pipe)(
                            i,
                            n.map((e) => e.alertsCount),
                            n.getOrElse(() => r.count)
                          ),
                        }))
                      ),
                    }
                  : a.trimmed > 0
                  ? { kind: M.fA.zero }
                  : { kind: M.fA.hidden }
              )
            )),
            this._subs.push(
              this._previewState.subscribe(x.wW(this.previewState))
            );
        }
        dispose() {
          this._subs.dispose();
        }
      }
      var F = i(77843),
        P = i(41398),
        V = i(85985),
        B = i(2768),
        O = i(10247);
      class N {
        constructor(e, t, i, a) {
          (this.feature = t),
            (this._closeAssistant = i),
            (this._gnar = a),
            (this._subs = []),
            this._subs.push(
              this.feature.requestInfo
                .view("status")
                .pipe((0, y.x)(), (0, _.G)(), (0, P.M)(e.activeView))
                .subscribe(([[t, i], a]) => {
                  t === O.eE.REVIEWING &&
                    a.type === f.aH.Type.proofitReview &&
                    e.popActiveView();
                })
            ),
            this._subs.push(
              this.feature.layoutCreated
                .pipe((0, P.M)(e.activeView))
                .subscribe(([t, i]) => {
                  (i.type !== f.aH.Type.proofitRequest &&
                    i.type !== f.aH.Type.proofitReview) ||
                    t ||
                    e.popActiveView();
                })
            );
        }
        onSubmitRequest(e) {
          this.feature.submitRequest(), this._gnar.proofitRequestFormSubmit();
          const t = this.feature.requestInfo
            .lens("status")
            .pipe((0, V.h)((e) => e === O.eE.ACCEPTED));
          (0, F.F)(100)
            .pipe((0, B.R)(t))
            .subscribe({ complete: () => this._closeAssistant(e) });
        }
        onCompleteRequest(e) {
          this.feature.resetRequest(),
            this._gnar.proofitOrderDone(),
            this._closeAssistant(e);
        }
        onSubmitFeedback(e) {
          this._gnar.proofitFeedbackFormSubmit(e.text, e.score);
        }
        dispose() {
          this._subs.forEach((e) => e.unsubscribe());
        }
      }
      var D = i(17771),
        U = i(90361),
        H = i(40018),
        j = i(14601),
        W = i(15646),
        G = i(35416);
      class z {
        constructor(e, t, i, a, r) {
          (this._feature = e),
            (this._assistantLensState = t),
            (this._assistantCardActions = i),
            (this._getAlertById = a),
            (this._getActiveAlert = r),
            (this._subs = new j.w()),
            (0, o.pipe)(
              this._feature,
              A.bw((e) => {
                var t, i;
                this._subs.add(
                  ((t = this._assistantCardActions),
                  (i = (e) => this._getAlertById(e)),
                  t.pipe(V.h(W.lY.isTakeawayAction)).pipe(
                    S.U((e) =>
                      (0, o.pipe)(
                        i(e.alertId),
                        n.chain((t) =>
                          D.Y(n.option)({
                            id: n.some(t.id),
                            rawId: H.bZ.getRawId(t),
                            isLikelyToRead: (0, o.pipe)(
                              t.extraProperties.takeaway,
                              n.map((e) => e.isLikelyToBeRead)
                            ),
                            score: (0, o.pipe)(
                              t.extraProperties.takeaway,
                              n.map((e) => e.score)
                            ),
                            textRange: n.fromNullable(
                              t.getHighlightRanges()[0]
                            ),
                            action: n.some(e),
                          })
                        ),
                        A.Fc
                      )
                    ),
                    V.h(U.fQ)
                  )).subscribe((t) => {
                    e.tracking.onTakeawayUserAction(
                      t.isLikelyToRead,
                      t.score,
                      t.action,
                      t.textRange
                    );
                  })
                ),
                  this._subs.add(
                    (function (e, t, i) {
                      return e
                        .pipe(
                          S.U(G.nL.getActiveAlert(i)),
                          S.U(n.map((e) => e.id))
                        )
                        .pipe(
                          S.U(A.Fc),
                          V.h(U.fQ),
                          y.x(),
                          S.U(
                            (0, s.ls)(
                              t,
                              n.chain((e) =>
                                (0, o.pipe)(
                                  e.extraProperties.takeaway,
                                  n.map(({ score: t }) => ({
                                    score: t,
                                    textRange: e.getHighlightRanges()[0],
                                  }))
                                )
                              ),
                              A.Fc
                            )
                          ),
                          V.h(U.fQ)
                        );
                    })(
                      this._assistantLensState,
                      (e) => this._getAlertById(e),
                      this._getActiveAlert
                    ).subscribe((t) => {
                      e.tracking.onKeyTakeawayCardShow(t.score, t.textRange);
                    })
                  );
              })
            );
        }
        dispose() {
          this._subs.unsubscribe();
        }
      }
      var q = i(41354),
        K = i(31536),
        Z = i(68654),
        X = i(10299),
        Y = i(5920),
        Q = i(16892),
        $ = i(48521),
        J = i(25975),
        ee = i(55415),
        te = i(95195),
        ie = i(65060);
      const ae = (e, t) => (i) =>
        (0, s.zG)(
          t,
          n.fold(
            () => n.some({ lens: i, newItem: n.none }),
            (t) =>
              (0, s.zG)(
                e,
                n.fold(
                  () =>
                    n.some({
                      lens: i,
                      newItem: n.some(
                        ie.g.create(
                          t,
                          Q.s.PositionState.empty,
                          $.o.VisualState.initial(
                            { type: "rendered", clockwise: true },
                            false
                          )
                        )
                      ),
                    }),
                  (e) =>
                    (0, s.zG)(
                      ie.g.create(t, e.positionState, e.visualState),
                      n.fromPredicate(
                        (t) =>
                          ie.g.hashCodeOwnFields(t) !==
                          ie.g.hashCodeOwnFields(e)
                      ),
                      n.map((e) => ({ lens: i, newItem: n.some(e) }))
                    )
                )
              )
          )
        );
      var se = i(48439),
        re = i(19751),
        ne = i(32952),
        oe = i(8125),
        le = i(73975),
        ce = i(74850),
        de = i(71249),
        ue = i(16314);
      const pe = ce.Y.create("ReadersAttentionItemSideEffects");
      class ge {
        constructor(e, t, i, a, r, o, l, c, d) {
          (this._cardActions = e),
            (this._readersAttentionItemInfo = t),
            (this._assistantLensState = i),
            (this._checksFeedCapabilities = a),
            (this._heatmapVisible = r),
            (this._layoutViewModel = o),
            (this._onDismiss = l),
            (this._gnar = c),
            (this._statistics = d),
            (this._subs = new j.w()),
            (this.actions = new ne.xQ()),
            (this._relayBaseActions = this.actions
              .pipe(
                V.h(
                  (0, oe.Kg)(
                    W.eI.isStartTransitionTo,
                    W.eI.isCompleteTransitionTo
                  )
                )
              )
              .subscribe((e) => this._cardActions.next(e))),
            (this._goToReadersAttentionView = this.actions
              .pipe(V.h(ue.Q))
              .subscribe((e) => {
                this._gnar.attentionScoreFullCardSeeSuggestionsButtonClick(),
                  this._layoutViewModel.pushActiveView({
                    type: f.aH.Type.readersAttention,
                    caller: {
                      type: f.aH.ReadersAttention.Caller.Type
                        .readersAttentionItem,
                      item: e.item,
                    },
                  });
              })),
            (this._goToFeedbackView = this.actions
              .pipe(V.h(ue.RJ))
              .subscribe(() => {
                this._layoutViewModel.pushActiveView({
                  type: f.aH.Type.feedback,
                });
              })),
            (this._dismissItem = this.actions.pipe(V.h(ue.l9)).subscribe(() => {
              this._gnar.attentionScoreFullCardDismissButtonClick(),
                this._onDismiss();
            })),
            (this._toggleHeatmapVisibility = this._assistantLensState
              .pipe(
                S.U((e) =>
                  (0, s.zG)(
                    te.DT(G.nL.hasItems, () => e.currentLens.id)(e),
                    te.UI(G.nL.Prism.getLens().get),
                    te.tS((e) =>
                      (0, s.zG)(
                        e,
                        G.In.getActiveItemOfType(ie.m),
                        te.Yo(() => e.id),
                        te.UI((e) => e.id)
                      )
                    )
                  )
                ),
                re.skipBy(te.Eh(le.yv, le.yv))
              )
              .subscribe(
                te.g_(
                  (e) => {
                    e !== T.R.SpecialId.PredictionTakeaways &&
                      this._heatmapVisible.set(false);
                  },
                  () => this._heatmapVisible.set(true)
                )
              )),
            (this._activeCardOpenStats = null),
            (this._trackOpenClose = this._assistantLensState
              .pipe(
                S.U((e) =>
                  (0, s.zG)(
                    n.fromPredicate(G.nL.hasItems)(e),
                    n.map(G.nL.Prism.getLens().get),
                    n.chain(G.In.getActiveItemOfType(ie.m)),
                    n.fold(s.jv, s.W8)
                  )
                ),
                y.x()
              )
              .subscribe((e) => {
                (0, s.zG)(
                  this._readersAttentionItemInfo.get(),
                  n.map((e) => se.T.prism.reverseGet(e.attentionScore)),
                  A.bw((t) => {
                    const i = this._statistics.wordsCount.get();
                    e
                      ? (this._gnar.attentionScoreFullCardShow(i, t),
                        (this._activeCardOpenStats = {
                          numWords: i,
                          attentionScore: t,
                        }))
                      : this._activeCardOpenStats &&
                        (this._gnar.attentionScoreFullCardHide(
                          i,
                          t,
                          this._activeCardOpenStats.numWords,
                          this._activeCardOpenStats.attentionScore
                        ),
                        (this._activeCardOpenStats = null));
                  })
                );
              })),
            this._subs.add(this._relayBaseActions),
            this._subs.add(this._toggleHeatmapVisibility),
            this._subs.add(this._goToReadersAttentionView),
            this._subs.add(this._goToFeedbackView),
            this._subs.add(this._dismissItem),
            this._subs.add(this._trackOpenClose);
        }
        getApplicatorEffects() {
          return (
            (e = this._readersAttentionItemInfo),
            (t = this.actions),
            (i = this._checksFeedCapabilities),
            (0, o.pipe)(
              [
                [e.pipe(S.U(() => s.yR)), "newReadersAttentionInfo"],
                [
                  t.pipe(
                    V.h(ue.Vl),
                    S.U(
                      (e) => (i) =>
                        i.patch({
                          currentLens: (0, o.pipe)(
                            i.currentLens.items.find((t) => i.id === t.id),
                            n.fold(
                              () => (
                                pe.error(
                                  "Cannot focus non-existing ReadersAttentionItem."
                                ),
                                i.currentLens
                              ),
                              () =>
                                (0, s.MZ)(
                                  (0, o.pipe)(
                                    i.currentLens,
                                    i.selectItemById(t.id, [])
                                  )
                                )
                            )
                          ),
                        })
                    )
                  ),
                  "focusReadersAttentionItem",
                ],
              ],
              de.UI(([e, t]) => ({
                id: `readersAttentionFeedItem.effects.${t}`,
                when: T.R.isMainLens,
                what: G.nL.Effect.Applicator.create(e),
              }))
            )
          );
          var e, t, i;
        }
        dispose() {
          if (this._activeCardOpenStats) {
            const e = this._activeCardOpenStats.numWords,
              t = this._activeCardOpenStats.attentionScore;
            (0, s.zG)(
              this._readersAttentionItemInfo.get(),
              n.map((e) => se.T.prism.reverseGet(e.attentionScore)),
              A.bw((i) => {
                this._gnar.attentionScoreFullCardHide(
                  this._statistics.wordsCount.get(),
                  i,
                  e,
                  t
                );
              })
            ),
              this._heatmapVisible.set(false),
              (this._activeCardOpenStats = null);
          }
          this._subs.unsubscribe();
        }
      }
      var ve,
        fe = i(15701);
      !(function (e) {
        const t = (e, t) =>
          e.pipe(
            V.h(W.lY.isCreateSnippetAction),
            S.U(({ id: e }) => (i) => {
              const a = (0, s.zG)(
                i.currentLens.items.update(
                  e,
                  t({ type: "success", clockwise: true })
                ),
                te.g_(() => i.currentLens.items, s.yR)
              );
              return fe.sU.itemsLens.set(a, i);
            })
          );
        e.applicatorEffects = (e, i) =>
          (0, s.zG)(
            [[t(e, i), "suggestedSnippetSuccessEffect"]],
            de.UI(([e, t]) => ({
              id: `cardsViewModel.effects.${t}`,
              when: T.R.isWithAlertsId,
              what: G.nL.Effect.Applicator.create(e),
            }))
          );
      })(ve || (ve = {}));
      var we = i(77394),
        be = i(86620),
        Se = i(16868),
        ye = i(51540),
        _e = i(40081),
        ke = i(62346),
        Ae = i(780),
        Ce = i(73582),
        Ee = i(92783),
        Ie = i(44618),
        Me = i(84966),
        Te = i(13313),
        xe = i(21619),
        Re = i(54216),
        Le = i(48052),
        Fe = i(91549),
        Pe = i(4330),
        Ve = i(20594),
        Be = i(35607),
        Oe = i(20291),
        Ne = i(34383),
        De = i(33806),
        Ue = i(86775),
        He = i(11245),
        je = i(4890),
        We = i(73841),
        Ge = i(89770),
        ze = i(39920),
        qe = i(88772),
        Ke = i(74364),
        Ze = i(93508),
        Xe = i(68425),
        Ye = i(24209),
        Qe = i(17343),
        $e = i(76974),
        Je = i(66310),
        et = i(40151),
        tt = i(95574),
        it = i(81531);
      const at = (e) =>
          e
            .view((e) =>
              (0, o.pipe)(
                n.fromPredicate(G.nL.hasItems)(e),
                n.map((e) => e.currentLens.items),
                n.map((e) =>
                  e.filter((0, oe.Kg)(m.O.isAlertCard, m.O.isAlertsBundle))
                ),
                n.map((e) =>
                  e.filter((e) => "rendered" === e.visualState.transition.type)
                ),
                n.fold(
                  () => null,
                  (e) => e.values()
                )
              )
            )
            .pipe(
              Ze.O([]),
              V.h(U.Nf),
              _.G(),
              S.U(([e, t]) => {
                const i = new Set(e.map((e) => e.id));
                return t.filter((e) => !i.has(e.id));
              }),
              Xe.J()
            ),
        st = (e, t) =>
          e.alertClicked.pipe(
            S.U((e) =>
              (0, o.pipe)(
                e,
                n.fold(s.gn, (e) => e.alert)
              )
            ),
            V.h(U.fQ),
            P.M(
              ((e) =>
                e.pipe(
                  S.U((e) =>
                    G.nL.hasCards(e) && T.R.isMainLens(e.currentLens.id)
                      ? m.O.getActiveItemWithAlert(e.currentLens)
                      : n.none
                  ),
                  S.U((e) =>
                    (0, o.pipe)(
                      e,
                      n.fold(
                        () => null,
                        (e) => e.activeAlert
                      )
                    )
                  )
                ))(t)
            ),
            V.h(([e, t]) => e.id !== (null == t ? void 0 : t.id)),
            S.U(([e, t]) => e)
          ),
        rt = (
          e,
          t,
          i,
          a,
          v,
          b,
          k,
          M,
          R,
          F,
          P,
          B,
          O,
          D,
          j,
          Q,
          $,
          se,
          re,
          le,
          ce,
          de,
          ue,
          pe,
          me,
          he,
          Xe,
          rt,
          nt,
          ot
        ) => {
          const lt = it.C8.Logging.getLogger("view_models"),
            ct = C.h.create(Te.A.defaultState),
            dt = C.h.create(s.jv),
            ut = C.h.create(false),
            pt = C.h.create(false),
            mt = C.h.create(false),
            ht = (0, X.z)(D.view("user").get(), nt),
            gt = (e) =>
              (0, oe.W9)(
                () => !pt.get(),
                (0, oe.W9)((e) => !mt.get() || H.bZ.isInline(e), e)
              ),
            vt = Re.t.create(
              {
                ...Re.t.defaultLensFilters,
                [T.R.SpecialId.Priority]: H.bZ.belongsToPriorityLens,
                [T.R.SpecialId.AllAlerts]: (0, oe.W9)(
                  H.bZ.belongsToAllAlerts,
                  (0, s.ff)(H.bZ.isTakeaway)
                ),
              },
              {
                ...Re.t.defaultTextFilters,
                [T.R.SpecialId.Closed]: s.jv,
                [T.R.SpecialId.Priority]: gt(H.bZ.belongsToPriorityLens),
                [T.R.SpecialId.AllAlerts]: gt(
                  (0, oe.W9)(
                    H.bZ.belongsToAllAlerts,
                    (0, s.ff)(H.bZ.isTakeaway)
                  )
                ),
                [T.R.SpecialId.PredictionTakeaways]: (e) => dt.get()(e),
              }
            ),
            ft = Ye.T(dt, pt, ut, mt).pipe(Qe.h(x.PU)),
            wt = Te.A.get(
              e.alertsList.state,
              e.alertsList.lensesScores,
              vt
            ).subscribe(x.wW(ct)),
            bt = new _e.t(ct.view("lenses"), vt, e.sessionModel.scoreStatus),
            St = (0, Le.$y)((0, Ie.a)(t).getContents),
            yt = {
              features: new Set([Ve.IG.Features.showCardLabelInOutcomes]),
              cardLayoutDensityMode: je.j.Density.minimal,
              shouldAnimateAlertApply: Ve.IG.Default.shouldAnimateAlertApply,
              cardVisualMode: C.h.create(je.j.CardVisualMode.RegularLightMode),
            },
            _t = (0, Ve.Ls)(
              St,
              e.alertsReader,
              yt,
              () => $e.of(n.none),
              e.mutingAlertsReader
            ),
            kt = Fe.R.ItemFactory.create(St, e.mutingAlertsReader, yt, () =>
              $e.of(n.none)
            ),
            At = (0, He.U)(St, e.alertsReader, yt, Ne.T.ordAlert),
            Ct = C.h.create(Ne.D.empty()),
            Et = C.h.create(n.none),
            It = C.h.create(16),
            Mt = (0, d.q)(
              () => Pt.get().currentLens.id,
              () => Et.get(),
              () => It.get()
            ),
            Tt = m.O.getCapabilities(
              _t,
              kt,
              At,
              e.alertsReader,
              St,
              Ct,
              () => Pt.get().currentLens.id,
              Mt
            ),
            xt = new ze.gi(m.O.equatable.structEq, m.O.defaultOrd),
            Rt = (0, ze.is)(_t, Tt),
            Lt = new Ge.oq(
              e.alertsList.state,
              e.alertsReader,
              ct.view("lenses"),
              e.positionManager,
              bt,
              new ze.ad(
                (e) => e.id === T.R.SpecialId.Priority,
                new De.c(
                  At,
                  Ct,
                  e.alertsReader,
                  (e) => e.id === T.R.SpecialId.PredictionTakeaways,
                  xt,
                  m.O.equatable.structEq
                ),
                m.O.equatable.structEq,
                m.O.bundlesOrd
              ),
              (0, ze.kn)(
                kt,
                yt,
                (e) => e === T.R.SpecialId.Priority,
                (0, De.E)(
                  At,
                  Ct,
                  e.alertsReader,
                  (e) => e === T.R.SpecialId.PredictionTakeaways,
                  Rt,
                  Tt
                ),
                Tt
              ),
              Tt,
              vt
            ),
            Ft = i.get(),
            Pt = C.h.create(
              Lt.emptyState(Ft).patch({ alertSource: H.l$.sidebar })
            ),
            Vt = Pt.view((e) =>
              (0, o.pipe)(
                n.fromPredicate(G.nL.hasItems)(e),
                n.map(G.nL.Prism.getLens().get),
                n.filter((e) => e.id === T.R.SpecialId.PredictionTakeaways),
                n.chain(G.In.getActiveItem)
              )
            )
              .view(
                n.fold(
                  () => s.jv,
                  (e) => (t) => Tt.hasAlert(t.id)(e)
                )
              )
              .subscribe(x.wW(dt)),
            Bt = Pt.view((e) =>
              (0, o.pipe)(
                n.fromPredicate(G.nL.hasItems)(e),
                n.map(G.nL.Prism.getLens().get),
                n.chain(G.In.getActiveItem),
                n.filter(ie.m),
                n.fold(s.jv, s.W8)
              )
            ).subscribe(x.wW(pt));
          P.next({
            kind: we.R.ChangeLens,
            selectedLens: Ft === T.R.SpecialId.Priority ? "priority" : "all",
          });
          const Ot = (0, Pe.u0)(() => t.getCursor().index, Lt),
            Nt = new Ce.x(e.alertsList, Pt, 3),
            Dt = new w.EQ(new Ae.o(e.sessionModel, Nt, re.get().isPremium, Q)),
            Ut = new be.C(rt()),
            Ht = new fe.Xx(
              { flush: () => t.flushChanges() },
              new ne.xQ(),
              _t,
              e.alertsService,
              n.none,
              () => Promise.resolve(),
              () => Promise.resolve(),
              (0, o.pipe)(
                e.mutedAlertsCategoriesModel,
                n.map((e) => ({
                  model: e,
                  openSuggestionsManagement: () =>
                    self.open((0, Ee.Um)().suggestionsSettings),
                }))
              ),
              n.some(g.B.getCardsViewModelSendToURLExperiment(Ut, Q)),
              () => false,
              m.O.getActiveItemWithAlert,
              Tt,
              Pt,
              Ut,
              {
                bufferTransitions: true,
                showGbPrompt: g.B.shouldShow(re.get()),
              }
            ),
            jt = new u.y(Ht.actionEvents, Q, e.alertsReader),
            Wt = new f._z(Q, ce, de, he, Xe),
            Gt = new q.X(v, Wt, e.alertsList.state, e.alertsReader, Pt),
            zt = new L(
              bt,
              Wt,
              Gt,
              a,
              e.sessionModel,
              Gt.predictionCardState,
              Q
            ),
            qt = new p.WY(Pt, zt, Nt, Tt, Q, ht),
            Kt = new Be.o(() => te.F2(void 0)),
            Zt = qt.upgradeHookExpanded
              .pipe(
                S.U((e) => e && ht),
                y.x()
              )
              .subscribe(x.wW(ut)),
            Xt = (0, ke.xl)(Pt, vt, ft, ut),
            Yt = new ke.o$(
              e.alertsList,
              e.alertsReader,
              e.positionManager,
              e.alertsService,
              t,
              Pt,
              Xt,
              m.O.getActiveItemWithAlert,
              B,
              true,
              ut
            ),
            Qt = (0, Se.hp)(Pt, Yt, C.h.create(16), Kt, t, lt),
            $t = new ne.xQ(),
            Jt = Pt.pipe(S.U((e) => e.currentLens.id)),
            ei = Gt.checklist.subscribe(x.wW(Ct)),
            ti = new E(e.sessionModel, Wt, Dt, re, Q, le),
            ii = Wt.activeView
              .pipe(
                S.U((e) => e.type),
                Ze.O(f.aH.Type.startupPlaceholder),
                _.G(),
                S.U(
                  ([e, t]) =>
                    e === f.aH.Type.startupPlaceholder &&
                    t === f.aH.Type.proofitRequest
                )
              )
              .subscribe(x.wW(mt)),
            ai = qt.cardListViewportHeight.subscribe(x.wW(Et)),
            si = new h._(Wt, se, Q),
            ri = (0, o.pipe)(
              F,
              n.map((e) => new N(Wt, e, le, Q))
            ),
            ni = new xe.mN(
              t,
              Pt,
              Yt,
              e.alertsReader,
              m.O.getActiveItemWithAlert,
              (t) => {
                const i = t.reduce(
                    (t, i) =>
                      (0, o.pipe)(
                        e.alertsReader.getById(i.alert.id),
                        n.chain(H.bZ.getRawId),
                        A.bw((e) => t.set(e, i)),
                        n.fold(
                          () => t,
                          () => t
                        )
                      ),
                    new Map()
                  ),
                  a = Array.from(i.keys())
                    .map(pe.alerts.getAlertById)
                    .filter(U.fQ);
                if (a.length) {
                  const e = a.reduce((e, t) =>
                    l.S.ordering.greaterThanOrEqual(t, e) ? t : e
                  );
                  return n.fromNullable(i.get(Me.wQ.Id.create(e.id)));
                }
                return n.none;
              }
            ),
            oi = at(Pt),
            li = st(ni, Pt),
            ci = k
              .pipe(
                Je.w(
                  n.fold(
                    () => et.E,
                    (t) =>
                      t.initAssistantCardActionsProcessing(
                        Ht.actionEvents,
                        e.alertsReader,
                        Pt,
                        oi,
                        li
                      )
                  )
                )
              )
              .subscribe(),
            di = M.pipe(
              Je.w(
                n.fold(
                  () => et.E,
                  (t) =>
                    t.initCardActionsProcessing(
                      Ht.actionEvents,
                      e.alertsReader,
                      oi,
                      li,
                      Pt
                    )
                )
              )
            ).subscribe(),
            ui = R.pipe(
              Je.w(
                n.fold(
                  () => et.E,
                  (t) =>
                    t.initCardActionsProcessing(
                      Ht.actionEvents,
                      e.alertsReader,
                      oi,
                      Pt
                    )
                )
              )
            ).subscribe(),
            pi = C.h.create(
              (0, o.pipe)(
                O,
                n.fold(
                  () => Se.CV.skip,
                  () => H.l$.text
                ),
                n.some
              )
            ),
            mi = (0, o.pipe)(
              v,
              n.map(
                (e) =>
                  new ge(
                    Ht.actionEvents,
                    e.feedItemInfo,
                    Pt,
                    Tt,
                    e.heatmap.visible,
                    Wt,
                    () => e.onDismissFeedItem(),
                    Q,
                    $
                  )
              )
            ),
            hi = [
              (0, ye.A7)(ni, Pt, ht),
              (0, o.pipe)(
                Ke.EQ.focusMarkByActiveAlert(
                  Pt,
                  Yt,
                  e.alertsReader,
                  m.O.getActiveFocusableItem,
                  lt.getLogger("MarksEffects.focusMarkByActiveAlert")
                ),
                G.nL.Effect.Producer.delayed(B)
              ),
              (0, Z.yS)(
                Yt.events,
                Tt,
                lt.getLogger("createOnAlertApplySideEffect")
              ),
              (0, Z.fM)(Ht, Pt, e.alertsReader, _t, lt),
              (0, Z._2)(Pt, pi, qt.autoFocusEnabled),
              ...Ht.getApplicatorEffects(),
              qt.applicatorEffects,
              Oe.R7(Pt, Kt, Tt, (0, s.MZ)(Ht.actionEvents), {
                cardsAroundActive: 10,
                cardsBeyondViewport: 10,
              }),
              (0, o.pipe)(
                (0, Se.k9)(Pt, Qt, pi, m.O.getActiveAlignableItem, Tt),
                G.nL.Effect.Producer.delayed(B)
              ),
              Oe.XU(Pt, Kt, Tt),
              (0, Z.qS)($t, Jt),
              fe.dv.createSendActiveAlertFeedbacksEffect(
                Pt,
                m.O.getActiveItemWithAlert,
                e.alertsService,
                e.alertsReader,
                lt.getLogger(
                  "CardsViewModelEffects.createSendActiveAlertFeedbacksEffect"
                )
              ),
              Ue.G.getChecklistHandlerSideEffect(
                At,
                Gt.checklist,
                e.alertsReader,
                m.O.getActiveItemWithAlert,
                (e) => e === T.R.SpecialId.PredictionTakeaways
              ),
              ...(0, o.pipe)(
                mi,
                n.fold(
                  () => [],
                  (e) => e.getApplicatorEffects()
                )
              ),
              ...ve.applicatorEffects(Ht.actionEvents, Tt.transitionTo),
            ],
            gi = C.h.create(T.R.SpecialId.AllAlerts),
            vi = Pt.view((e) => e.currentLens.id)
              .pipe(
                V.h(
                  (e) =>
                    e === T.R.SpecialId.Priority ||
                    e === T.R.SpecialId.AllAlerts
                )
              )
              .subscribe(x.wW(gi)),
            fi = (0, Pe.VC)(Lt, Ot, gi, Tt),
            wi = C.h.create(O),
            bi = (0, Pe.Dv)((e) => T.R.isMainLens(e.currentLens.id), fi, Tt),
            Si = new Pe.vM(e.sessionModel.checkingState, Pt),
            yi = (0, o.pipe)(
              [
                (0, o.pipe)(
                  (e) =>
                    Pe.Py.whenShouldVerifyCurrentLens(
                      m.O.getActiveItemWithAlert,
                      Tt
                    )(e) &&
                    e.currentLens.id !== T.R.SpecialId.PredictionTakeaways,
                  Pe.Py.behaviorToEffect(() =>
                    n.some(G.nL.Effect.FocusBehavior.focusNext)
                  )
                ),
                (0, o.pipe)(
                  (0, oe.W9)(() => n.isSome(wi.get()), Pe.Py.whenNoActiveCard),
                  Pe.Py.behaviorToEffect((e) =>
                    (0, o.pipe)(
                      ((e) => {
                        const t = (0, n.fromPredicate)(
                          (0, oe.Kg)(m.O.isAlertCard, m.O.isAlertsBundle)
                        );
                        return (0, o.pipe)(
                          wi.get(),
                          n.chain(
                            (i) => (
                              wi.set(n.none),
                              G.nL.hasCards(e)
                                ? (0, o.pipe)(
                                    e.currentLens.items.reduce(
                                      (e, a) =>
                                        (0, o.pipe)(
                                          e,
                                          n.alt(() =>
                                            (0, o.pipe)(
                                              a,
                                              t,
                                              n.chain((e) =>
                                                n.fromNullable(
                                                  e.alerts.find((e) =>
                                                    e.id.startsWith(i + "_")
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        ),
                                      n.none
                                    ),
                                    n.map((t) => ({
                                      alert: t,
                                      highlightIndex: 0,
                                      lensId: e.currentLens.id,
                                    }))
                                  )
                                : n.none
                            )
                          )
                        );
                      })(e),
                      n.map((e) => G.nL.Effect.FocusBehavior.focusAlert(e))
                    )
                  )
                ),
                (0, o.pipe)(
                  (0, oe.W9)(
                    () => qt.autoFocusEnabled.get(),
                    (0, oe.W9)(
                      Pe.Py.whenFirstOpeningDocumentWithAlerts(Si),
                      Pe.Py.whenNoActiveCard
                    )
                  ),
                  Pe.Py.behaviorToEffect(() =>
                    n.some(G.nL.Effect.FocusBehavior.focusFirst)
                  )
                ),
              ],
              (0, r.fold)((0, r.getFunctionMonoid)(n.getFirstMonoid())())
            ),
            _i = Pe.Py.getStateTransformer(
              yi,
              bi,
              e.alertsReader,
              Tt,
              (e) => qt.autoFocusEnabled.get() && "text" !== e.alertSource,
              s.Q1,
              gi
            ),
            ki = J.v.Items.getItemsPositionsUpdateTransformer(Tt),
            Ai = (0, o.pipe)(
              v,
              n.fold(
                () => qe.t.nothing,
                (e) => {
                  return (
                    (t = e.feedItemInfo),
                    ({ state: e, metadata: i }) => {
                      if (
                        !G.nL.hasItems(e) ||
                        !T.R.isMainLens(e.currentLens.id) ||
                        !G.nL.isLensview(e)
                      )
                        return te.t$({ state: e, metadata: i });
                      const a = (0, s.zG)(
                        Y.l.find(e.currentLens.items, ie.m),
                        n.map(ee.ei("value"))
                      );
                      return (0, s.zG)(
                        e,
                        G.nL.getLens,
                        n.chain(ae(a, t.get())),
                        n.map(({ lens: t, newItem: i }) =>
                          G.nL.Prism.getLens()
                            .compose(J.v.Prism.items)
                            .set(
                              (0, s.zG)(
                                a,
                                n.fold(
                                  () => t.items,
                                  (e) => t.items.remove(e.id)
                                ),
                                (e) =>
                                  (0, s.zG)(
                                    i,
                                    n.fold(
                                      () => e,
                                      (t) => e.add(t)
                                    )
                                  )
                              ),
                              e
                            )
                        ),
                        n.getOrElse(() => e),
                        (e) => te.t$({ state: e, metadata: i })
                      );
                    }
                  );
                  var t;
                }
              )
            ),
            Ci = (0, s.ls)(_i, tt.L9(ki), tt.L9(Ai)),
            Ei = new We.l(
              Pt,
              Lt,
              e.alertsReader,
              e.alertsService,
              hi,
              m.O.getActiveItemWithAlert,
              Ci
            ),
            Ii = $t
              .pipe(
                S.U(({ lensId: e }) => e),
                V.h(
                  (e) =>
                    e === T.R.SpecialId.AllAlerts ||
                    e === T.R.SpecialId.Priority
                ),
                y.x()
              )
              .subscribe((e) => {
                i.set(e),
                  P.next({
                    kind: we.R.ChangeLens,
                    selectedLens:
                      e === T.R.SpecialId.Priority ? "priority" : "all",
                  });
              }),
            Mi = Wt.activeView
              .pipe(
                S.U((e) => {
                  switch (e.type) {
                    case f.aH.Type.default:
                      return i.get();
                    case f.aH.Type.emogenie:
                      return T.R.SpecialId.PredictionEmogenie;
                    case f.aH.Type.readersAttention:
                      return T.R.SpecialId.PredictionTakeaways;
                    case f.aH.Type.readersAttentionHelp:
                      return T.R.SpecialId.Closed;
                    case f.aH.Type.proofitReview:
                      return T.R.SpecialId.RealTimeProofit;
                    default:
                      return null;
                  }
                }),
                V.h(U.fQ),
                y.x(),
                S.U((e) => [
                  e,
                  e === T.R.SpecialId.AllAlerts || e === T.R.SpecialId.Priority,
                ])
              )
              .subscribe(([e, t]) => $t.next({ lensId: e, focusFirstCard: t })),
            Ti = new K.X(D, j, se),
            xi = new z(
              v,
              Pt,
              Ht.actionEvents,
              (t) => e.alertsReader.getById(t),
              m.O.getActiveItemWithAlert
            ),
            Ri = b
              .pipe(
                Je.w(
                  n.fold(
                    () => et.E,
                    (t) =>
                      t.initAssistantSession(
                        Ht.actionEvents,
                        e.alertsReader,
                        Pt,
                        e.alertsService,
                        e.alertsList.state
                      )
                  )
                )
              )
              .subscribe(),
            Li = Ht.actionEvents
              .pipe(V.h(W.lY.isOpenIdeasGallery))
              .subscribe(() =>
                self.open((0, Ee.Um)().grammarlyIdeasSales, "_blank")
              ),
            Fi = (0, I.W)(ue),
            Pi = Ht.actionEvents.subscribe(
              (0, s.ls)(
                (0, c.JH)(e.alertsReader, c.SV.Source.assistant),
                A.bw(
                  async (e) => (
                    e.kind === c.SV.Kind.alertApply &&
                      e.source === c.SV.Source.assistant &&
                      (await ot.incrementCounter()),
                    me.next(e)
                  )
                )
              )
            );
          return {
            lensState: Pt,
            cardsViewModel: Ht,
            lensPreviewViewModel: bt,
            cardsListScrollManager: Kt,
            upgradeViewModel: Nt,
            alertProcessor: pe,
            assistantHeaderViewModel: ti,
            assistantLayoutViewModel: Wt,
            assistantCardListViewModel: qt,
            lensChanged: $t,
            predictionsPreviewViewModel: zt,
            assistantFeedbackViewModel: si,
            assistantSettingsViewModel: Ti,
            assistantProofitViewModel: ri,
            readersAttentionViewModel: Gt,
            readersAttentionItemViewModel: mi,
            assistantModalManager: Dt,
            marksViewModel: Yt,
            gnar: Q,
            positionViewModel: Fi,
            user: re,
            capabilities: Tt,
            remSize: It,
            isSingleCardAssistant: false,
            dispose: () => {
              Pi.unsubscribe(),
                xi.dispose(),
                Vt.unsubscribe(),
                ei.unsubscribe(),
                Ht.dispose(),
                Ei.dispose(),
                Yt.dispose(),
                zt.dispose(),
                Ii.unsubscribe(),
                wt.unsubscribe(),
                Mi.unsubscribe(),
                ti.dispose(),
                qt.dispose(),
                Dt.hideAll(),
                Gt.dispose(),
                vi.unsubscribe(),
                ai.unsubscribe(),
                Ri.unsubscribe(),
                Bt.unsubscribe(),
                ii.unsubscribe(),
                Li.unsubscribe(),
                di.unsubscribe(),
                ui.unsubscribe(),
                ci.unsubscribe(),
                Zt.unsubscribe(),
                (0, o.pipe)(
                  ri,
                  A.bw((e) => e.dispose())
                ),
                (0, o.pipe)(
                  mi,
                  A.bw((e) => e.dispose())
                ),
                jt.dispose();
            },
          };
        };
    },
    9671: (e, t, i) => {
      i.d(t, { t: () => l, y: () => o });
      var a = i(15090),
        s = i(15646),
        r = i(77176),
        n = i(85985);
      class o {
        constructor(e, t, i) {
          (this._cardActions = e),
            (this._gnar = t),
            (this._alertsReader = i),
            (this._subs = [
              l(this._cardActions, this._gnar, "assistant"),
              a.g.createSubscription(
                this._cardActions,
                this._gnar,
                this._alertsReader.getById
              ),
            ]);
        }
        dispose() {
          this._subs.forEach((e) => e.unsubscribe());
        }
      }
      const l = (e, t, i) =>
        e
          .pipe(
            r.U((e) => e.type),
            n.h(
              (e) =>
                e === s.lY.Type.muteAlertCategory ||
                e === s.lY.Type.undoMuteAlertCategory ||
                e === s.lY.Type.mutedAlertSuggestionManagementClick ||
                e === s.lY.Type.mutedAlertSuccessShow
            )
          )
          .subscribe((e) => {
            switch (e) {
              case s.lY.Type.muteAlertCategory:
                t.mutedAlertsCardTurnOffButtonClick(i);
                break;
              case s.lY.Type.undoMuteAlertCategory:
                t.mutedAlertsTurnBackOnButtonClick(i);
                break;
              case s.lY.Type.mutedAlertSuggestionManagementClick:
                t.suggestionManagementClick(i);
                break;
              case s.lY.Type.mutedAlertSuccessShow:
                t.categoryDeactivatedShow(i);
            }
          });
    },
    38152: (e, t, i) => {
      i.d(t, { WY: () => D, lo: () => a });
      var a,
        s = i(57050),
        r = i(40327),
        n = i(51972),
        o = i(40033),
        l = i(73582),
        c = i(90361),
        d = i(66896),
        u = i(40018),
        p = i(70023),
        m = i(40489),
        h = i(9922),
        g = i(77176),
        v = i(95300),
        f = i(28043),
        w = i(2834),
        b = i(95093),
        S = i(32952),
        y = i(16782),
        _ = i(85985),
        k = i(24209),
        A = i(78674),
        C = i(60797),
        E = i(57091),
        I = i(50628),
        M = i(66310),
        T = i(85089),
        x = i(41398),
        R = i(16118),
        L = i(35416),
        F = i(25975),
        P = i(27125),
        V = i(5114),
        B = i(8125),
        O = i(38983),
        N = i(31881);
      !(function (e) {
        let t;
        !(function (e) {
          (e.clickOnEmpty = "clickOnEmpty"),
            (e.clickOnFakeCard = "clickOnFakeCard"),
            (e.clickOnUpgradeCard = "clickOnUpgradeCard");
        })((t = e.Type || (e.Type = {})));
      })(a || (a = {}));
      class D {
        constructor(e, t, i, D, U, H) {
          (this._lensState = e),
            (this._predictionsVM = t),
            (this._upgradeViewModel = i),
            (this._capabilities = D),
            (this._gnar = U),
            (this._isYellowUnderlinesExperimentActive = H),
            (this._subs = new h.w.Keeper()),
            (this.activeAlert = this._lensState.pipe(
              g.U((e) =>
                L.nL.hasCards(e) && d.R.isMainLens(e.currentLens.id)
                  ? n.O.getActiveItemWithAlert(e.currentLens)
                  : V.none
              ),
              g.U((e) =>
                (0, r.pipe)(
                  e,
                  V.fold(
                    () => null,
                    (e) => e.activeAlert
                  )
                )
              )
            )),
            (this.successView = O.h.combine(
              this._lensState,
              this._predictionsVM.previewState,
              (e, t) =>
                F.v.WithSuccess.State.isInSuccess(this._capabilities)(e)
                  ? t.kind === o.fA.visible
                    ? V.some(P.g.SuccessType.applied)
                    : V.some(P.g.SuccessType.small)
                  : V.none
            )),
            (this._premiumAlertsCount =
              this._upgradeViewModel.advancedAlerts.view(
                (0, s.ls)(
                  V.map((e) => e.count),
                  V.getOrElse(() => 0)
                )
              )),
            (this.havePremiumAlerts = this._premiumAlertsCount.view(
              (e) => e > 0
            )),
            (this._upgradeHookExpanded = new v.X(false)),
            (this.upgradeHookExpanded = (0, r.pipe)(
              this._upgradeHookExpanded,
              f.x()
            )),
            (this.upgradeHookFlow = (0, r.pipe)(
              (0, p.d)(this._upgradeViewModel.advancedAlerts),
              N.Z.extendActions(
                w.b((e) => {
                  e.key === m.n.State.expanded
                    ? "upgrade" === e.action.kind
                      ? (this._upgradeViewModel.openUpgradeUrl(
                          l.L.Place.assistantCardList
                        ),
                        this._gnar.getPremiumButtonClick(
                          "assistantList",
                          "SeeWhatsInPremium"
                        ))
                      : "onUpgradeButtonMount" === e.action.kind &&
                        this._onUpgradeButtonMount.next(e.action.element)
                    : e.key === m.n.State.minimized &&
                      "onClick" === e.action.action &&
                      (this._upgradeHookExpandReason.next("click"),
                      this._isYellowUnderlinesExperimentActive &&
                        this.assistantActions.next({
                          type: a.Type.clickOnUpgradeCard,
                        }));
                })
              ),
              N.Z.patchState(b.T(this._minimizeUpgradeHook())),
              N.Z.patchState(b.T(this._autoOpenUpgradeHook())),
              N.Z.patchState(
                w.b((e) =>
                  this._onUpgradeHookShown.next(
                    (function (e) {
                      switch (e) {
                        case "hidden":
                          return m.n.State.hidden;
                        case "expanded":
                          return m.n.State.expanded;
                        case "minimized":
                          return m.n.State.minimized;
                        default:
                          (0, c.vE)(e);
                      }
                    })(e.kind)
                  )
                )
              ),
              N.Z.patchState(
                w.b((e) =>
                  this._upgradeHookExpanded.next("expanded" === e.kind)
                )
              )
            )),
            (this.cardListContext = new v.X(V.none)),
            (this.assistantActions = new S.xQ()),
            (this.autoFocusEnabled = O.h.create(true)),
            (this.cardListViewportHeight = O.h.create(V.none)),
            (this._onUpgradeButtonMount = new y.t()),
            (this._upgradeHookExpandReason = new y.t()),
            (this._onUpgradeHookShown = new S.xQ()),
            (this._unselectActiveAlert = this.assistantActions.pipe(
              _.h(
                (e) =>
                  e.type === a.Type.clickOnEmpty ||
                  e.type === a.Type.clickOnFakeCard ||
                  !(
                    !this._isYellowUnderlinesExperimentActive ||
                    e.type !== a.Type.clickOnUpgradeCard
                  )
              ),
              w.b(() => this.autoFocusEnabled.set(false)),
              g.U(
                () => (e) =>
                  e.patch({
                    currentLens: (0, r.pipe)(
                      L.In.getActiveItem(e.currentLens),
                      V.fold(
                        () => e.currentLens,
                        (t) =>
                          L.nL.hasItems(e)
                            ? this._capabilities.unselectItem()(e.currentLens)
                            : e.currentLens
                      )
                    ),
                    switchOrder: "lensOrder",
                    alertSource: u.l$.sidebar,
                  })
              )
            )),
            (this.applicatorEffects = {
              id: "assistantCardListViewModel.effects",
              when: d.R.isWithAlertsId,
              what: L.nL.Effect.Applicator.create(
                k.T(this._unselectActiveAlert)
              ),
            }),
            this._subs.push(
              this._onUpgradeHookShown
                .pipe(
                  A.b(1),
                  f.x(),
                  _.h((e) => e === m.n.State.minimized)
                )
                .subscribe(() =>
                  this._gnar.assistantCollapsedUpgradeHookShow()
                ),
              this._onUpgradeButtonMount
                .pipe(
                  C.oA,
                  E.a(this.cardListContext.pipe(C.oA, I.P())),
                  M.w(([e, t]) => T.n(e, { root: t }).pipe(I.P())),
                  _.h(B.Dw),
                  g.U((e) => Math.trunc(100 * e[0].intersectionRatio)),
                  x.M(this._upgradeHookExpandReason, this._premiumAlertsCount)
                )
                .subscribe(([e, t, i]) =>
                  this._gnar.assistantExpandedUpgradeHookShow(i, e, t)
                ),
              this._lensState
                .pipe(
                  _.h(L.nL.hasCards),
                  g.U((e) => L.In.getActiveItem(e.currentLens)),
                  R.G(),
                  _.h(([e, t]) => V.isNone(e) && V.isSome(t))
                )
                .subscribe((e) => {
                  this.autoFocusEnabled.set(true);
                })
            );
        }
        dispose() {
          this._subs.dispose();
        }
        _minimizeUpgradeHook() {
          return this.activeAlert.pipe(
            f.x(),
            x.M(this.upgradeHookExpanded),
            _.h(
              ([e, t]) => !!(e && t && this._isYellowUnderlinesExperimentActive)
            ),
            x.M(this._upgradeViewModel.advancedAlerts),
            g.U(([e, t]) =>
              (0, r.pipe)(
                t,
                V.fold(
                  () => ({ kind: m.n.State.hidden }),
                  (e) => ({ kind: m.n.State.minimized, alertsCount: e.count })
                )
              )
            )
          );
        }
        _autoOpenUpgradeHook() {
          return this._lensState.pipe(
            _.h((e) =>
              (0, r.pipe)(
                e.currentLens.id,
                (0, B.Kg)(d.R.isPriority, d.R.isAllAlerts)
              )
            ),
            g.U(F.v.WithSuccess.State.isInSuccess(this._capabilities)),
            E.a(this.havePremiumAlerts, (e, t) => e && t),
            f.x(),
            w.b((e) => {
              e && this._upgradeHookExpandReason.next("alertsAddressed");
            }),
            x.M(this._upgradeViewModel.advancedAlerts),
            g.U(([e, t]) =>
              (0, r.pipe)(
                t,
                V.fold(
                  () => ({ kind: m.n.State.hidden }),
                  (t) =>
                    e
                      ? {
                          kind: m.n.State.expanded,
                          showCloseButton: true,
                          alertsState: { count: t.count, alerts: t.alerts() },
                        }
                      : { kind: m.n.State.minimized, alertsCount: t.count }
                )
              )
            )
          );
        }
      }
    },
    51972: (e, t, i) => {
      i.d(t, { O: () => X });
      var a = i(57050),
        s = i(35214),
        r = i(40327),
        n = i(54483),
        o = i(31820),
        l = i(35108),
        c = i(77176),
        d = i(40151),
        u = i(2834),
        p = i(55415),
        m = i(22232),
        h = i(5114),
        g = i(16027),
        v = i(27378),
        f = i(41572),
        w = i(64757),
        b = i(61922),
        S = i(3656),
        y = i(28706),
        _ = i(26027),
        k = i(15646),
        A = i(74754),
        C = i(66346),
        E = i(76974),
        I = i(5739),
        M = i(16314),
        T = i(35501),
        x = i(35630),
        R = i(32585);
      const L = g.UI.Node.make(({ state: e, notify: t }) => {
          const i = v.useContext(f.m.Context);
          return v.createElement(
            I.F.Fragment,
            null,
            e.pipe(
              c.U((e) =>
                (0, a.zG)(
                  e.details,
                  h.fold(
                    () => v.createElement("div", null),
                    () =>
                      v.createElement(
                        w.zx.Tertiary,
                        {
                          key: "toggle-more",
                          name: (0, C.hC)(e.visualState, i),
                          title: (0, C.hC)(e.visualState, i),
                          onClick: y.hz(
                            t({
                              type: k.eI.Kind.startTransitionTo,
                              id: e.id,
                              transition: {
                                type: _.X.isCardOpen(e.visualState)
                                  ? "focused"
                                  : "expanded",
                                clockwise: true,
                              },
                            })
                          ),
                        },
                        _.X.isCardOpen(e.visualState)
                          ? v.createElement(b.JO.Arrow, {
                              key: "more",
                              className: R.lessIcon,
                            })
                          : v.createElement(b.JO.QuestionMark, {
                              key: "expand",
                            }),
                        (0, C.hC)(e.visualState, i)
                      )
                  )
                )
              )
            )
          );
        }),
        F = g.UI.Node.make(({ notify: e }) =>
          v.createElement(
            w.zx.Tertiary,
            {
              name: "dismiss",
              title: "Dismiss",
              onClick: y.hz(e({ type: M.Dy.ignoreButtonClick })),
            },
            v.createElement(b.JO.Ignore, null)
          )
        ),
        P = g.UI.Node.make(({ state: e }) =>
          v.createElement(
            I.F.Fragment,
            null,
            e.pipe(
              c.U((e) =>
                (0, a.zG)(
                  e.details,
                  h.fold(a.gn, (t) =>
                    v.createElement(
                      C.G3,
                      {
                        key: "card-actions-details",
                        visualState: e.visualState,
                        className: R.more,
                      },
                      v.createElement(S.XY, {
                        className: R.minimalDescription,
                        ...A.y.renderToHtml(t),
                      })
                    )
                  )
                )
              )
            )
          )
        ),
        V = g.UI.Node.make(({ notify: e }) =>
          v.createElement(
            w.zx.Flat,
            {
              className: R.feedbackFooter,
              name: "attention-score-card-open-feedback-form",
              onClick: y.hz(e({ type: M.Dy.feedbackButtonClick })),
            },
            v.createElement("span", null, "Anything we can improve?"),
            v.createElement(b.JO.OpenFeedbackFormArrow, null)
          )
        ),
        B = g.UI.Node.make(({ state: e, notify: t }) =>
          v.createElement(
            I.F.Fragment,
            null,
            e.pipe(
              c.U((e) =>
                v.createElement(
                  w.zx.Primary,
                  {
                    name: "readersAttentionItem-view-more",
                    onClick: y.hz(
                      t({ type: M.Dy.viewMoreButtonClick, item: e })
                    ),
                    className: R.viewMoreButton,
                  },
                  "See suggestions"
                )
              )
            )
          )
        ),
        O = g.UI.Knot.make(
          g.UI.Grid.make(({ slots: e }) =>
            v.createElement(
              I.F.div,
              { className: x.card, "data-name": "attention-score-card-full" },
              e.header,
              v.createElement(
                I.F.div,
                { className: R.cardBody },
                e.content,
                e.details,
                v.createElement(
                  "div",
                  { className: R.actions },
                  e.viewMoreButton
                )
              ),
              v.createElement(
                I.F.div,
                { className: R.actionsFooter },
                e.expandButton,
                e.dismissButton
              ),
              e.feedbackFooter
            )
          ),
          {
            header: (0, T.h)("full"),
            content: T.r,
            details: P,
            expandButton: L,
            dismissButton: F,
            viewMoreButton: B,
            feedbackFooter: V,
          }
        ),
        N = (e) =>
          g.Z.composeKnot({
            header: () => e,
            content: () =>
              e.pipe(
                c.U((e) => ({
                  attentionScore: e.attentionScore,
                  attentionScoreDescription: e.description,
                }))
              ),
            details: () => e,
            expandButton: () => e,
            dismissButton: () => E.of(null),
            viewMoreButton: g.Z.fromSideEffect(a.Q1, e),
            feedbackFooter: () => E.of(null),
          });
      var D = i(12187),
        U = i(65060),
        H = i(11510);
      const j = g.UI.Knot.make(
          g.UI.Grid.make(({ slots: e, notify: t }) =>
            v.createElement(
              I.F.div,
              {
                "data-name": "attention-score-card-mini",
                onClick: y.hz(t({ type: M.Dy.miniCardClick, id: U.g.id })),
                ...(0, D.Sh)(x.card, H.miniCard),
              },
              e.header
            )
          ),
          { header: (0, T.h)("mini") }
        ),
        W = (e) =>
          g.Z.composeKnot({
            root: g.Z.fromSideEffect(a.Q1, null),
            header: () => e,
          });
      var G;
      !(function (e) {
        const t = g.UI.Union.make("kind", {
            mini: j,
            full: O,
            hidden: g.UI.Node.empty,
          }),
          i = (e) => ({
            mini: W(
              e.pipe(
                c.U((e) => ({
                  title: e.view.title,
                  attentionScore: e.view.attentionScore,
                  density: e.density,
                }))
              )
            ),
            full: N(e.pipe(c.U(p.ei("view")))),
            hidden: () => d.E,
          }),
          s = n.G.make(t);
        function r(e) {
          switch (e) {
            case "added":
            case "rendered":
              return "mini";
            case "focused":
            case "expanded":
              return "full";
            case "hidden":
            case "removed":
              return "hidden";
            case "presuccess":
            case "success":
            case "feedback_form":
            case "muted":
              throw new Error(`${e} is not supported for ReadersAttentionCard`);
            default:
              (0, m.vE)(e);
          }
        }
        e.Card = g.UI.Node.make(({ state: e, notify: t }) =>
          g.UI.mount(
            s,
            (0, a.zG)(
              o.g.flow(
                e.pipe(c.U(p.ei("view"))),
                (0, a.zG)(
                  ((e) =>
                    g.Z.composeUnion(i(e), () =>
                      e.pipe(
                        c.U((e) => ({
                          kind: r(e.view.visualState.transition.type),
                        }))
                      )
                    ))(e),
                  g.Z.extendActions(u.b((e) => t(e.action.action)()))
                ),
                ((e) =>
                  g.Z.composeUnion(i(e), () =>
                    e.pipe(
                      c.U((e) => ({
                        kind: (0, a.zG)(
                          e.view.visualState.from,
                          h.fold(() => "mini", r)
                        ),
                      }))
                    )
                  ))(e),
                p.ei("id"),
                l.CE.toOption(l.a)
              ),
              o.g.extend((e) => t(e)())
            )
          )
        );
      })(G || (G = {}));
      var z = i(48521),
        q = i(16892);
      const K = (e) => (t) => ({ ...t, positionState: e }),
        Z = (e) => (t) => ({ ...t, visualState: e });
      var X,
        Y = i(66896),
        Q = i(13188),
        $ = i(7910),
        J = i(49978),
        ee = i(84974),
        te = i(98752),
        ie = i(17594),
        ae = i(91549),
        se = i(20594),
        re = i(86775),
        ne = i(77610),
        oe = i(15215),
        le = i(70100),
        ce = i(47306),
        de = i(35416),
        ue = i(25975),
        pe = i(8125),
        me = i(83078),
        he = i(73975),
        ge = i(45701),
        ve = i(31881);
      !(function (e) {
        function c(e, i) {
          return {
            viewState: (a, s) =>
              de.nL.Items.mapper(
                (e) =>
                  ((t) => ({
                    view: t,
                    isLastCard: a,
                    kind: "alertCard",
                    visibleViewportHeight: e(s),
                  })).kind,
                {
                  [_.X.Kind]: (t) => ({
                    view: t,
                    isLastCard: a,
                    kind: "alertCard",
                    visibleViewportHeight: e(s),
                  }),
                  [ae.R.Kind]: (t) => ({
                    view: t,
                    isLastCard: a,
                    kind: "alertsBundle",
                    visibleViewportHeight: e(s),
                  }),
                  [le.X.kind]: (e) => ({ view: e, kind: "checklistItemEmpty" }),
                  [ce.J.kind]: (t) => ({
                    view: t,
                    kind: "checklistItemWithAlerts",
                    isLastCard: a,
                    visibleViewportHeight: e(s),
                  }),
                  [U.g.kind]: (e) => ({
                    density:
                      (e.kind === _.X.Kind) === Y.R.SpecialId.AllAlerts
                        ? "normal"
                        : "compact",
                    view: e,
                    kind: "readersAttentionItem",
                  }),
                }
              ),
          };
        }
        (e.isSelectableWithAlertItem = (0, pe.Kg)(
          i,
          n,
          oe.d.isChecklistItemWithAlerts
        )),
          (e.getActiveItemWithAlert = de.In.getActiveItemOfType(
            e.isSelectableWithAlertItem
          )),
          (e.getActiveAlignableItem = de.In.getActiveItemOfType(
            e.isSelectableWithAlertItem
          )),
          (e.getActiveFocusableItem = de.In.getActiveItemOfType(
            e.isSelectableWithAlertItem
          )),
          (e.checksFeedItemsMapper = t),
          (e.isAlertCard = i),
          (e.isAlertsBundle = n),
          (e.isEthicalAIAlertCard = o),
          (e.isEthicalAIAlertsBundle = l),
          (e.defaultOrd = (0, s.fold)(ge.getMonoid())([
            (0, r.pipe)(ge.ordBoolean, ge.contramap((0, pe.ff)(o))),
            (0, r.pipe)(ge.ordBoolean, ge.contramap(U.m)),
            ge.fromCompare((e, t) =>
              e.kind === _.X.Kind && t.kind === _.X.Kind
                ? _.X.ord.compare(e, t)
                : 0
            ),
          ])),
          (e.bundlesOrd = (0, s.fold)(ge.getMonoid())([
            (0, r.pipe)(ge.ordBoolean, ge.contramap((0, pe.ff)(l))),
            (0, r.pipe)(ge.ordBoolean, ge.contramap(U.m)),
            ge.fromCompare((e, t) =>
              e.kind === ae.R.Kind && t.kind === ae.R.Kind
                ? ae.R.ord.compare(e, t)
                : 0
            ),
          ])),
          (e.item = (e) =>
            ve.UI.Union.make("kind", {
              alertCard: Q.p.Card(e),
              alertsBundle: J.Q.Card(e),
              checklistItemEmpty: ee.z.Card(e),
              checklistItemWithAlerts: te.fw.Card(e),
              readersAttentionItem: G.Card,
            })),
          (e.viewState = c),
          (e.createCardListFlow = (e) =>
            (0, $.sJ)((t) =>
              (0, r.pipe)(
                e,
                me.bw((e) => e.actions.next(t.action))
              )
            )),
          (e.listItemOrd = (e) =>
            ge.contramap((e) => e.cell.item.view)(e).compare);
        const d = {
            equals: (e, t) => e.kind === t.kind && q.s.eqById.equals(e, t),
          },
          u = (e, t, i, a, s) => ({
            equals: (r, n) => {
              const o = {
                [_.X.Kind]: e,
                [ae.R.Kind]: t,
                [le.X.kind]: i,
                [ce.J.kind]: a,
                [U.g.kind]: s,
              };
              return (
                d.equals(r, n) &&
                (function (e, t) {
                  return (i, a) => t[e(i)].equals(i, a);
                })((e) => e.kind, o)(r, n)
              );
            },
          }),
          p = (0, s.fold)(he.uZ())([z.o.eq, q.s.verticalPositionEq, d]);
        function m(e, i) {
          const a = _.X.Capabilities.getChangePosition(e);
          return {
            changePosition: (e) =>
              de.nL.Items.mapper((e) => a.changePosition(e).kind, {
                [_.X.Kind]: a.changePosition(e),
                [ae.R.Kind]: ae.R.changePosition(e),
                [le.X.kind]: le.X.changePositionState(e),
                [ce.J.kind]: i.changePositionState(e),
                [U.g.kind]: K(e),
              }),
          };
        }
        function g(e, i, a) {
          const s = _.X.Capabilities.getAnimatable(e),
            r = ae.R.Capabilities.getAnimatable(a);
          return {
            completeTransition: (e) => {
              return de.nL.Items.mapper((e) => s.completeTransition(e).kind, {
                [_.X.Kind]: s.completeTransition(e),
                [ae.R.Kind]: r.completeTransition(e),
                [le.X.kind]: le.X.completeTransition(e),
                [ce.J.kind]: i.completeTransition(e),
                [U.g.kind]:
                  ((a = e),
                  (e) => ({
                    ...e,
                    visualState: z.o.VisualState.complete(e.visualState, a),
                  })),
              });
              var a;
            },
            transitionTo: (e) =>
              de.nL.Items.mapper((e) => s.transitionTo(e).kind, {
                [_.X.Kind]: s.transitionTo(e),
                [ae.R.Kind]: r.transitionTo(e),
                [le.X.kind]: le.X.transitionTo(e),
                [ce.J.kind]: i.transitionTo(e),
                [U.g.kind]: ((e) => (t) => ({
                  ...t,
                  visualState: z.o.VisualState.to(t.visualState, e),
                }))(e),
              }),
            changeVisualState: (e) =>
              de.nL.Items.mapper((e) => s.changeVisualState(e).kind, {
                [_.X.Kind]: s.changeVisualState(e),
                [ae.R.Kind]: r.changeVisualState(e),
                [le.X.kind]: le.X.changeVisualState(e),
                [ce.J.kind]: i.changeVisualState(e),
                [U.g.kind]: Z(e),
              }),
          };
        }
        function v(e, i, s, n, o) {
          const l = ae.R.getCardHydrator(o),
            c = ae.R.getSelect(s, n, l),
            d = ae.R.getSelectByAlert(s, n, l),
            u = _.X.Capabilities.getSelect(e);
          return {
            select: (e, s, n) =>
              de.nL.Items.mapper((e) => u.select(e, s, n).kind, {
                [_.X.Kind]: u.select(e, s, n),
                [ae.R.Kind]: c(e, s),
                [le.X.kind]: le.X.select(e),
                [ce.J.kind]: i.selectFirstAlert((0, a.MZ)(e), s),
                [U.g.kind]: (function (e, t) {
                  return (i) => {
                    const s = (0, r.pipe)(
                        e,
                        h.map((e) => t.compare(i, e) > 0),
                        h.getOrElse(a.W8)
                      ),
                      n = (0, r.pipe)(
                        e,
                        h.exists((e) => e.id === i.id)
                      ),
                      o =
                        n && _.X.isCardOpen(i.visualState)
                          ? "expanded"
                          : "focused",
                      l = (0, r.pipe)(
                        e,
                        h.fold(
                          () =>
                            z.o.VisualState.initial({ type: o, clockwise: s }),
                          (e) =>
                            z.o.VisualState.to(i.visualState, {
                              type: o,
                              clockwise: s,
                            })
                        )
                      );
                    return (0, r.pipe)(
                      i,
                      n
                        ? a.yR
                        : K(
                            q.s.PositionState.invalidateHeight(i.positionState)
                          ),
                      Z(l)
                    );
                  };
                })(e, s),
              }),
            selectByAlert: (e, s, r, n) =>
              de.nL.Items.mapper((e) => u.selectByAlert(e, s, r, n).kind, {
                [_.X.Kind]: u.selectByAlert(e, s, r, n),
                [ae.R.Kind]: d(s, e, r),
                [le.X.kind]: le.X.select(e),
                [ce.J.kind]: i.selectByAlert(s, (0, a.MZ)(e), r),
                [U.g.kind]: a.yR,
              }),
            unselect: (e, s) =>
              de.nL.Items.mapper((e) => u.unselect((0, a.MZ)(e), s).kind, {
                [_.X.Kind]: u.unselect((0, a.MZ)(e), s),
                [ae.R.Kind]: ae.R.unselect((0, a.MZ)(e), s),
                [le.X.kind]: le.X.unselect(e),
                [ce.J.kind]: i.unselect((0, a.MZ)(e), s),
                [U.g.kind]: (function (e, t) {
                  return (i) => {
                    const s = (0, r.pipe)(
                        e,
                        h.map((e) => t.compare(i, e) > 0),
                        h.getOrElse(a.W8)
                      ),
                      n = (0, r.pipe)(
                        e,
                        h.exists((e) => e.id === i.id)
                      );
                    return (0, r.pipe)(
                      i,
                      n
                        ? a.yR
                        : K(
                            q.s.PositionState.invalidateHeight(i.positionState)
                          ),
                      z.o.isHidden(i)
                        ? a.yR
                        : Z(
                            z.o.VisualState.to(i.visualState, {
                              type: "rendered",
                              clockwise: s,
                            })
                          )
                    );
                  };
                })(e, s),
              }),
          };
        }
        function f(e, s, r, o, l, c) {
          return {
            removeAlertFromItem: (d, u) =>
              de.nL.Items.mapper(
                (e) =>
                  ((t) =>
                    _.X.Capabilities.getRemoveAlerts(e, u.itemsOrd)(
                      d,
                      de.In.getActiveItemOfType(i)(u)
                    )(t)).kind,
                {
                  [_.X.Kind]: (t) =>
                    _.X.Capabilities.getRemoveAlerts(e, u.itemsOrd)(
                      d,
                      de.In.getActiveItemOfType(i)(u)
                    )(t),
                  [ae.R.Kind]: (e) =>
                    ae.R.Capabilities.getRemoveAlertsCapability(
                      o,
                      l,
                      c,
                      u.itemsOrd
                    )(
                      d,
                      de.In.getActiveItemOfType(n)(u)
                    )(e),
                  [le.X.kind]: a.yR,
                  [ce.J.kind]: (e) =>
                    re.G.getRemoveAlert(s, r, o).removeAlertFromItem(d, u)(e),
                  [U.g.kind]: a.yR,
                }
              ),
          };
        }
        function w(e, i, s, r) {
          const n = _.X.Capabilities.getRemove(e);
          return {
            remove: (e, o) =>
              de.nL.Items.mapper((e) => n.remove(e, o).kind, {
                [_.X.Kind]: n.remove(e, o),
                [ae.R.Kind]: (t) =>
                  e(t)
                    ? ae.R.Capabilities.getRemove(s, r)(
                        [t.activeAlert],
                        t.kind === _.X.Kind && ne.C.isEthicalAIItem(t)
                      )(t)
                    : t,
                [le.X.kind]: a.yR,
                [ce.J.kind]: (t) =>
                  e(t)
                    ? i.removeAlerts(
                        t.alerts,
                        t.kind === _.X.Kind && ne.C.isEthicalAIItem(t)
                      )(t)
                    : t,
                [U.g.kind]: a.yR,
              }),
          };
        }
        function b(e, i, s, r) {
          const n = _.X.Capabilities.getUpdateWithAlert(e),
            o = ae.R.Capabilities.getUpdatableWithAlertsCapability(i, r);
          return {
            updateWithAlerts: (e) =>
              de.nL.Items.mapper((e) => n.updateWithAlerts(e).kind, {
                [_.X.Kind]: n.updateWithAlerts(e),
                [ae.R.Kind]: e.kind === _.X.Kind && ne.C.isEthicalAIItem(e),
                [le.X.kind]: a.yR,
                [ce.J.kind]: s.updateWith(e),
                [U.g.kind]: a.yR,
              }),
          };
        }
        (e.equatable = {
          structEq: u(_.X.eq, ae.R.eq, le.X.eq, ce.J.eq, U.g.eq),
          idEq: u(d, d, d, d, d),
          visualStateEq: u(p, p, p, p, p),
        }),
          (e.changePosition = m),
          (e.disposable = {
            isScheduledToDispose: de.nL.Items.mapper(
              (e) => ((e) => ne.C.willBeDisposed(e, e.removedAlertsIds)).kind,
              {
                [_.X.Kind]: (e) => ne.C.willBeDisposed(e, e.removedAlertsIds),
                [ae.R.Kind]: (e) => ne.C.willBeDisposed(e, e.removedAlertsIds),
                [le.X.kind]: a.jv,
                [ce.J.kind]: (e) => ne.C.willBeDisposed(e, e.removedAlertsIds),
                [U.g.kind]: a.jv,
              }
            ),
          }),
          (e.hidable = {
            isHidden: de.nL.Items.mapper((e) => z.o.isHidden.kind, {
              [_.X.Kind]: z.o.isHidden,
              [ae.R.Kind]: z.o.isHidden,
              [le.X.kind]: z.o.isHidden,
              [ce.J.kind]: z.o.isHidden,
              [U.g.kind]: z.o.isHidden,
            }),
          }),
          (e.animatableItem = g),
          (e.hasAlertsQueries = {
            isSelectableByAlert: (e) =>
              de.nL.Items.mapper((e) => ne.C.hasAlert(e.alert.id).kind, {
                [_.X.Kind]: ne.C.hasAlert(e.alert.id),
                [ae.R.Kind]: ne.C.hasAlert(e.alert.id),
                [le.X.kind]: a.jv,
                [ce.J.kind]: ne.C.hasAlert(e.alert.id),
                [U.g.kind]: a.jv,
              }),
            hasAlert: (e) =>
              de.nL.Items.mapper((e) => ne.C.hasAlert(e).kind, {
                [_.X.Kind]: ne.C.hasAlert(e),
                [ae.R.Kind]: ne.C.hasAlert(e),
                [le.X.kind]: a.jv,
                [ce.J.kind]: ne.C.hasAlert(e),
                [U.g.kind]: a.jv,
              }),
            hasActiveAlert: de.nL.Items.mapper(
              (e) => ne.C.hasActiveAlert.kind,
              {
                [_.X.Kind]: ne.C.hasActiveAlert,
                [ae.R.Kind]: ne.C.hasActiveAlert,
                [le.X.kind]: () => h.none,
                [ce.J.kind]: ne.C.hasActiveAlert,
                [U.g.kind]: () => h.none,
              }
            ),
          }),
          (e.changePositionStrategyQueries = {
            useReferenceHeightOnRemove: de.nL.Items.mapper((e) => a.jv.kind, {
              [_.X.Kind]: a.jv,
              [ae.R.Kind]: a.jv,
              [le.X.kind]: a.jv,
              [ce.J.kind]: a.W8,
              [U.g.kind]: a.jv,
            }),
          }),
          (e.select = v),
          (e.removeAlert = f),
          (e.remove = w),
          (e.updateWithAlert = b),
          (e.releaseAlert = (t, i, a, s, r, n) =>
            ue.v.Capabilities.getAlertReleaser({
              ...f(t, i, a, s, r, n),
              ...e.disposable,
            })),
          (e.unselectable = (e, t, i, a, s) =>
            ue.v.Capabilities.getUnselectable(
              de.In.getActiveItem,
              v(e, t, i, a, s)
            )),
          (e.selectableByAlert = (t, i, a, s, r) =>
            ue.v.Capabilities.getSelectableByAlert(de.In.getActiveItem, {
              ...e.hasAlertsQueries,
              ...v(t, i, a, s, r),
              ...ue.v.Capabilities.getHasChecksFeed(),
            })),
          (e.selectableById = (e, t, i, a, s) =>
            ue.v.Capabilities.getSelectableById(
              de.In.getActiveItem,
              v(e, t, i, a, s)
            )),
          (e.updateMeta = () => ({
            updateMeta: ue.v.Capabilities.getMetaUpdatable().updateMeta,
          })),
          (e.animatableFeed = (e, t, i, a, s, r) =>
            ue.v.Capabilities.getAnimatable(e, {
              ...f(e, t, i, a, s, r),
              ...g(e, t, r),
              ...ue.v.Capabilities.getHasChecksFeed(),
            })),
          (e.hasPriorityToggle = (t, i, a) =>
            ue.v.WithPriority.getHasPriorityToggle({
              ...g(t, i, a),
              ...e.hasAlertsQueries,
              ...e.disposable,
            }));
        const S = (t) =>
          ["focused", "expanded"].includes(t.visualState.transition.type) &&
          !e.disposable.isScheduledToDispose(t);
        function y(e, i) {
          const a = se.Mq.getCardSelections(i);
          return {
            nextAlert: de.nL.Items.mapper((e) => a.nextAlert.kind, {
              [_.X.Kind]: a.nextAlert,
              [ae.R.Kind]: a.nextAlert,
              [le.X.kind]: () => h.none,
              [ce.J.kind]: e.nextAlert,
              [U.g.kind]: () => h.none,
            }),
            prevAlert: de.nL.Items.mapper((e) => a.prevAlert.kind, {
              [_.X.Kind]: a.prevAlert,
              [ae.R.Kind]: a.prevAlert,
              [le.X.kind]: () => h.none,
              [ce.J.kind]: e.prevAlert,
              [U.g.kind]: () => h.none,
            }),
          };
        }
        function k() {
          return {
            updateUserInput: (e) =>
              de.nL.Items.mapper((e) => _.X.updateUserInput(e).kind, {
                [_.X.Kind]: _.X.updateUserInput(e),
                [ae.R.Kind]: ae.R.changeUserInput(e),
                [le.X.kind]: a.yR,
                [ce.J.kind]: a.yR,
                [U.g.kind]: a.yR,
              }),
          };
        }
        (e.alignable = {
          isValidToAlign: de.nL.Items.mapper((e) => S.kind, {
            [_.X.Kind]: S,
            [ae.R.Kind]: S,
            [le.X.kind]: a.jv,
            [ce.J.kind]: S,
            [U.g.kind]: a.jv,
          }),
        }),
          (e.alertIterator = y),
          (e.itemReleaser = (e, t, i) =>
            re.G.getItemReleaser(e, t, i, ue.v.Capabilities.getItemReleaser())),
          (e.hasAlerts = ue.v.Capabilities.getHasAlerts),
          (e.getDefaultNextAlertItemFilter = (t) =>
            (0, pe.W9)(
              e.isSelectableWithAlertItem,
              (i) =>
                !e.disposable.isScheduledToDispose(i) &&
                (0, r.pipe)(
                  i,
                  e.hasAlertsQueries.hasActiveAlert,
                  h.map((e) => t.isRegistered(e.alert.id)),
                  h.getOrElse(a.jv)
                )
            )),
          (e.hasUserInput = k),
          (e.priorityTest = (0, pe.W9)(i, (e) =>
            ie.$.isPriority(e.activeAlert)
          )),
          (e.verifiable = () => ue.v.Capabilities.getVerifiable(e.disposable)),
          (e.cloneable = () => {
            const e = q.s.Capabilities.getPojoCloneable().clone;
            return {
              clone: de.nL.Items.mapper(
                (e) => _.X.Capabilities.getCloneable().clone.kind,
                {
                  [_.X.Kind]: _.X.Capabilities.getCloneable().clone,
                  [ae.R.Kind]: e,
                  [le.X.kind]: e,
                  [ce.J.kind]: e,
                  [U.g.kind]: e,
                }
              ),
            };
          }),
          (e.getCapabilities = function (
            t,
            i,
            s,
            r,
            n,
            o,
            l,
            d = (0, a.a9)(h.none),
            u = se.IG.Default
          ) {
            return {
              ...c(d, l),
              ...e.disposable,
              ...e.hidable,
              ...e.equatable,
              ...k(),
              ...e.cloneable(),
              ...m(t, s),
              ...g(t, s, n),
              ...v(t, s, r, u, n),
              ...w(t, s, u, n),
              ...f(t, s, o, r, u, n),
              ...b(t, i, s, n),
              ...e.hasAlertsQueries,
              ...e.changePositionStrategyQueries,
              ...e.alignable,
              ...e.releaseAlert(t, s, o, r, u, n),
              ...e.unselectable(t, s, r, u, n),
              ...e.selectableByAlert(t, s, r, u, n),
              ...e.selectableById(t, s, r, u, n),
              ...e.updateMeta(t),
              ...e.animatableFeed(t, s, o, r, u, n),
              ...e.hasPriorityToggle(t, s, n),
              ...e.itemReleaser(s, o, r),
              ...e.verifiable(),
              ...e.cloneable(),
              ...e.hasAlerts(y(s, r), r, () => e.isSelectableWithAlertItem, {
                ...e.hasAlertsQueries,
                ...e.disposable,
              }),
            };
          });
      })(X || (X = {}));
    },
    5178: (e, t, i) => {
      i.d(t, { Q: () => a, _: () => n });
      var a,
        s = i(75003),
        r = i(53844);
      !(function (e) {
        (e.readersAttention = "readers_attention"), (e.settings = "settings");
      })(a || (a = {}));
      class n {
        constructor(e, t, i) {
          (this._assistantLayoutViewModel = e),
            (this._domain = t),
            (this._gnar = i),
            (this._entryPoint = void 0);
        }
        getDomain() {
          return this._domain;
        }
        openFeedback(e) {
          (this._entryPoint = e),
            this._gnar.assistantFeedbackButtonClick(this._entryPoint),
            this._assistantLayoutViewModel.pushActiveView({
              type: s.aH.Type.feedback,
            });
        }
        submitFeedback(e) {
          this._entryPoint &&
            this._gnar.assistantFeedbackSubmitButtonClick(
              this._entryPoint,
              e.domain,
              e.text,
              (0, r.dK)(e) ? e.score : void 0
            );
        }
      }
    },
    19654: (e, t, i) => {
      i.d(t, { B: () => a });
      var a,
        s = i(92783),
        r = i(15701);
      !(function (e) {
        e.shouldShow = (e) => {
          var t;
          return !!(null === (t = e.institutionInfo) || void 0 === t
            ? void 0
            : t.voxEnabled);
        };
        const t = (e) => ({
          onShow: (t) => e.gbPromptFormShow(t),
          onAccept: (t) => e.gbPromptAcceptClick(t),
          onDismiss: (t) => e.gbPromptDismissClick(t),
        });
        e.getCardsViewModelSendToURLExperiment = (e, i) => ({
          handleGbPrompt: r.sU.Experiments.handleGbPrompt(
            e,
            {
              account: {
                styleGuide: (0, s.Um)().styleGuideSettings,
                writingStyle: (0, s.Um)().writingStyleSettings,
              },
            },
            t(i)
          ),
        });
      })(a || (a = {}));
    },
    75003: (e, t, i) => {
      i.d(t, { D$: () => d, _z: () => u, aH: () => a });
      var a,
        s = i(7309),
        r = i(90361),
        n = i(14601),
        o = i(78674),
        l = i(85985),
        c = i(38983);
      !(function (e) {
        let t, i, a;
        !(function (e) {
          (e.default = "default"),
            (e.emogenie = "emogenie"),
            (e.readersAttention = "readersAttention"),
            (e.readersAttentionHelp = "readersAttentionHelp"),
            (e.feedback = "feedback"),
            (e.settings = "settings"),
            (e.proofitRequest = "proofitRequest"),
            (e.proofitReview = "proofitReview"),
            (e.popup = "popup"),
            (e.startupPlaceholder = "startupPlaceholder");
        })((t = e.Type || (e.Type = {}))),
          (function (e) {
            let t;
            !(function (e) {
              let t;
              !(function (e) {
                (e.predictionWidget = "predictionWidget"),
                  (e.navigation = "navigation"),
                  (e.readersAttentionItem = "readersAttentionItem");
              })((t = e.Type || (e.Type = {})));
            })((t = e.Caller || (e.Caller = {})));
          })((i = e.ReadersAttention || (e.ReadersAttention = {}))),
          (function (e) {
            let t;
            !(function (e) {
              e.none = "none";
            })((t = e.Type || (e.Type = {})));
          })((a = e.Popup || (e.Popup = {}))),
          (e.isDefault = function (t) {
            return t.type === e.Type.default;
          }),
          (e.isEmogenie = function (t) {
            return t.type === e.Type.emogenie;
          }),
          (e.isReadersAttention = function (t) {
            return t.type === e.Type.readersAttention;
          }),
          (e.isReadersAttentionHelp = function (t) {
            return t.type === e.Type.readersAttentionHelp;
          }),
          (e.isFeedback = function (t) {
            return t.type === e.Type.feedback;
          }),
          (e.isSettings = function (t) {
            return t.type === e.Type.settings;
          }),
          (e.isProofitRequest = function (t) {
            return t.type === e.Type.proofitRequest;
          }),
          (e.isProofitReview = function (t) {
            return t.type === e.Type.proofitReview;
          }),
          (e.isPopup = function (t) {
            return t.type === e.Type.popup;
          });
      })(a || (a = {}));
      class d {
        constructor(e, t, i, a, s, d, u) {
          (this._defaultView = i),
            (this.browser = d),
            (this.layout = u),
            (this._sub = new n.w()),
            (this.viewHistory = []),
            (this._activeView = c.h.create(a)),
            this._sub.add(
              e.subscribe((e) => {
                if (e.length > 0)
                  for (; !this.activeViewHasAlerts(); ) this.popActiveView();
              })
            ),
            s &&
              this._sub.add(
                t.pipe(o.b(100), l.h(r.fQ)).subscribe(() => {
                  if (s.has(this._activeView.get().type))
                    for (
                      ;
                      this._activeView.get().type !== this._defaultView.type;

                    )
                      this.popActiveView();
                })
              );
        }
        activeViewHasAlerts() {
          return false;
        }
        get activeView() {
          return this._activeView.view();
        }
        get lastView() {
          return (
            this.viewHistory[this.viewHistory.length - 1] || this._defaultView
          );
        }
        pushActiveView(e) {
          const t = this._activeView.get();
          e.type !== t.type &&
            (this.viewHistory.push(t), this._activeView.set(e));
        }
        popActiveView() {
          const e = this.viewHistory.pop() || this._defaultView;
          this._activeView.set(e);
        }
        replaceActiveView(e) {
          e.type !== this._activeView.get().type && this._activeView.set(e);
        }
        dispose() {
          this._sub.unsubscribe();
        }
      }
      class u extends d {
        constructor(e, t, i, r, n = s.V.classicAssistantLayout) {
          super(
            t,
            i,
            { type: a.Type.default },
            { type: a.Type.startupPlaceholder },
            new Set([a.Type.readersAttention, a.Type.emogenie]),
            r,
            n
          ),
            (this.isHeaderNavigationEnabled = this._activeView.view(
              (e) => e.type !== a.Type.feedback
            )),
            this._sub.add(
              this._activeView.subscribe((t) => {
                switch (t.type) {
                  case a.Type.settings:
                    return void e.assistantSettingsShow();
                  case a.Type.proofitRequest:
                    return void e.proofitRequestFormShow();
                  default:
                    return;
                }
              })
            );
        }
        activeViewHasAlerts() {
          switch (this._activeView.get().type) {
            case a.Type.default:
            case a.Type.emogenie:
            case a.Type.readersAttention:
              return true;
            default:
              return false;
          }
        }
        pushActiveView(e) {
          const t = this._activeView.get();
          e.type !== t.type &&
            (t.type !== a.Type.startupPlaceholder && this.viewHistory.push(t),
            this._activeView.set(e));
        }
        popActiveView() {
          const e = this.viewHistory.pop() || this._defaultView;
          e.type === a.Type.readersAttention
            ? this._activeView.set({
                ...e,
                caller: { type: a.ReadersAttention.Caller.Type.navigation },
              })
            : this._activeView.set(e);
        }
      }
    },
    59456: (e, t, i) => {
      i.d(t, { W: () => s });
      var a = i(63919);
      const s = (e) => {
        const t = e.initialPositionOffset.get();
        return {
          initialPositionOffset: t,
          onDrag: (i) => {
            e.updateInitialPositionOffset(
              a.E9.plus(t, a.E9.fromCartesian(i.translate))
            );
          },
        };
      };
    },
    41354: (e, t, i) => {
      i.d(t, { d: () => S, X: () => j });
      var a = i(17771),
        s = i(57050),
        r = i(26328),
        n = i(40327),
        o = i(75003),
        l = i(40018),
        c = i(4390),
        d = i(93508),
        u = i(16118),
        p = i(77176),
        m = i(85985),
        h = i(66310),
        g = i(12126),
        v = i(40151),
        f = i(92843),
        w = i(5114),
        b = i(71249);
      var S,
        y = i(90361),
        _ = i(66896),
        k = i(98403),
        A = i(19751),
        C = i(14601),
        E = i(28043),
        I = i(34383),
        M = i(15215),
        T = i(35416),
        x = i(83078),
        R = i(73975),
        L = i(38983),
        F = i(17889),
        P = i(32243),
        V = i(86718);
      function B(e, t) {
        return L.h.combine(
          e.panelInfo.view(
            w.map((e) => ({ items: e.checklist, wordsCount: e.wordsCount }))
          ),
          t,
          (e, t) => {
            const i = c.p.reduce(new Map(), (e, t) => {
              return (0, s.zG)(
                ((i = t),
                (0, s.zG)(
                  i.alert.extraProperties.takeawayBundleId,
                  w.map(I.T.Id.create)
                )),
                w.fold(
                  () => e,
                  (i) => e.set(i, (e.get(i) || []).concat([t]))
                )
              );
              var i;
            })(t);
            return (0, s.zG)(
              e,
              w.fold(
                () => new Map(),
                (e) =>
                  new Map(
                    P.AO(e.items).map(([t, a]) => [
                      I.T.Id.create(t),
                      N(a, e.wordsCount, i),
                    ])
                  )
              )
            );
          }
        );
      }
      function N(e, t, i) {
        const a = I.T.Id.create(e.id),
          r = (i.get(a) || []).map((e) => e.alert),
          n = (0, s.zG)(
            r,
            b.hX(
              (e) =>
                !l.bZ.isTakeaway(e) ||
                w.isNone(e.takeawayFeedback) ||
                x.FX(l.TO.correctlyDetected)(e.takeawayFeedback)
            ),
            (e) => (e.every(O) ? [] : e),
            F.nI
          );
        return {
          id: a,
          rank: e.rank,
          suggestionsView: (0, s.zG)(
            e.suggestionsCard,
            w.chain((e) =>
              (0, s.zG)(
                n,
                w.map((t) => ({
                  title: e.title,
                  miniTitle: e.miniTitle,
                  miniLabel: w.none,
                  alertIds: (0, s.zG)(
                    t,
                    (0, F.UI)((e) => e.id)
                  ),
                }))
              )
            )
          ),
          emptyView: {
            checked: e.defaultCard.checked,
            title: e.defaultCard.title,
            miniTitle: e.defaultCard.miniTitle,
            miniLabel:
              "textLength" === e.defaultCard.kind
                ? w.some(`${t} words`)
                : w.none,
            card: D(e, t),
          },
        };
      }
      function D(e, t) {
        const i =
          "simple" === e.defaultCard.kind
            ? V.f.Kind.simple
            : "textLength" === e.defaultCard.kind
            ? V.f.Kind.textLength
            : (0, y.vE)(e.defaultCard.kind);
        return i === V.f.Kind.simple
          ? {
              kind: i,
              explanation: e.defaultCard.description,
              details: e.defaultCard.details,
            }
          : {
              kind: i,
              explanation: e.defaultCard.description,
              details: e.defaultCard.details,
              wordCount: t,
            };
      }
      !(function (e) {
        (e.ok = "ok"), (e.warning = "warning"), (e.feedback = "feedback");
      })(S || (S = {}));
      class j {
        constructor(e, t, i, o, y) {
          (this._readersAttentionFeature = e),
            (this._assistantLayoutVM = t),
            (this._alertsCollection = i),
            (this._alertsReader = o),
            (this._assistantLensState = y),
            (this._subs = new C.w()),
            (this._checklist = L.h.create(I.D.empty())),
            (this.checklist = this._checklist.view()),
            (this.panelState = (0, n.pipe)(
              this._readersAttentionFeature,
              w.fold(
                () => L.h.create(w.none),
                (e) =>
                  L.h.combine(e.panelInfo, this._checklist, (e, t) =>
                    (0, n.pipe)(
                      e,
                      w.map((e) => ({
                        attentionScore: e.attentionScore,
                        attentionScoreDescription: e.attentionScoreDescription,
                        headerMessage: e.headerMessage,
                        numChecklistItemsChecked: Array.from(t.values()).reduce(
                          (e, t) =>
                            w.isNone(t.suggestionsView) && t.emptyView.checked
                              ? e + 1
                              : e,
                          0
                        ),
                        numChecklistItems: t.size,
                      }))
                    )
                  )
              )
            )),
            (this.predictionCardState = (0, n.pipe)(
              this._readersAttentionFeature,
              w.fold(
                () => L.h.create(w.none),
                (e) =>
                  (function (e, t, i) {
                    return L.h.combine(e.panelInfo, t, (e, t) =>
                      (0, n.pipe)(
                        e,
                        w.map((e) => ({
                          message: e.predictionMessage,
                          icon: Array.from(t.values()).every(U)
                            ? S.ok
                            : Array.from(t.values()).every((e) =>
                                (0, n.pipe)(
                                  e.suggestionsView,
                                  w.map(
                                    (function (e) {
                                      return (t) =>
                                        (0, n.pipe)(
                                          t.alertIds,
                                          (0, r.UI)(
                                            (0, s.ls)(
                                              e.getById,
                                              w.filter(
                                                (e) =>
                                                  l.bZ.isTakeaway(e) &&
                                                  e.takeawayIsLikelyToBeRead &&
                                                  w.isNone(e.takeawayFeedback)
                                              )
                                            )
                                          ),
                                          b.yW(w.isSome)
                                        );
                                    })(i)
                                  ),
                                  w.getOrElse(() => e.emptyView.checked)
                                )
                              )
                            ? S.feedback
                            : S.warning,
                          alertsCount: (0, n.pipe)(
                            Array.from(t.values()),
                            b.u4(
                              0,
                              (e, t) =>
                                t +
                                (0, n.pipe)(
                                  t.suggestionsView,
                                  w.map((e) => t.alertIds.length),
                                  w.getOrElse(() => 0)
                                )
                            )
                          ),
                        }))
                      )
                    );
                  })(e, this._checklist, this._alertsReader)
              )
            )),
            this._subs.add(
              this._handleHeatmapVisibilityAndNavigationTracking()
            ),
            this._subs.add(this._trackChecklistItemExpand()),
            (0, n.pipe)(
              this._readersAttentionFeature,
              x.bw((e) => {
                var t;
                this._subs.add(
                  ((t = this._alertsCollection),
                  t.pipe(
                    d.O(c.p.empty),
                    u.G(),
                    p.U(([e, t]) =>
                      (0, n.pipe)(
                        c.p.diff(e, t),
                        c.p.Diff.filter((e) => l.bZ.isTakeaway(e.alert))
                      )
                    ),
                    m.h((0, s.ff)(f.v.isEmpty)),
                    p.U((e) =>
                      (0, n.pipe)(
                        e,
                        f.v.reduce(
                          new Map(),
                          (e, t) => e,
                          (e, t, i) =>
                            l.bZ.isTakeaway(i.alert)
                              ? e.set(i.alert.id, i.alert)
                              : e,
                          (e, t) =>
                            l.bZ.isTakeaway(t.alert)
                              ? e.set(t.alert.id, t.alert)
                              : e
                        )
                      )
                    ),
                    h.w((e) =>
                      (0, n.pipe)(
                        Array.from(e.values()),
                        b.UI((e) =>
                          (0, n.pipe)(
                            a.Y(w.option)({
                              rawId: (0, n.pipe)(e, l.bZ.getRawId),
                              feedback: e.takeawayFeedback,
                            }),
                            w.map((e) => ({
                              rawId: e.rawId,
                              feedback: e.feedback,
                            }))
                          )
                        ),
                        b.oA,
                        (e) => (e.length > 0 ? g.D(e) : v.E)
                      )
                    )
                  )).subscribe((t) => {
                    e.takeawaysFeedbackStore.registerFeedback(
                      t.rawId,
                      t.feedback
                    );
                  })
                ),
                  this._subs.add(
                    B(e, this._alertsCollection).subscribe(
                      k.wW(this._checklist)
                    )
                  );
              })
            );
        }
        openPanel(e) {
          this._assistantLayoutVM.pushActiveView({
            type: o.aH.Type.readersAttention,
            caller: e,
          });
        }
        showHelp() {
          this._assistantLayoutVM.pushActiveView({
            type: o.aH.Type.readersAttentionHelp,
          }),
            this._trackOnShowHelp();
        }
        dispose() {
          (o.aH.isReadersAttention(this._assistantLayoutVM.activeView.get()) ||
            o.aH.isReadersAttentionHelp(
              this._assistantLayoutVM.activeView.get()
            )) &&
            ((0, n.pipe)(
              this._readersAttentionFeature,
              x.bw((e) => e.heatmap.visible.set(false))
            ),
            this._trackOnReadersAttentionHide()),
            this._subs.unsubscribe();
        }
        _handleHeatmapVisibilityAndNavigationTracking() {
          return this._assistantLayoutVM.activeView
            .pipe(
              E.x((e, t) => e.type === t.type),
              d.O(null),
              u.G()
            )
            .subscribe(([e, t]) => {
              (0, n.pipe)(
                this._readersAttentionFeature,
                x.bw((i) => {
                  (o.aH.isReadersAttention(t) ||
                    o.aH.isReadersAttentionHelp(t)) &&
                  !i.heatmap.visible.get()
                    ? i.heatmap.visible.set(true)
                    : e &&
                      (o.aH.isReadersAttention(e) ||
                        o.aH.isReadersAttentionHelp(e)) &&
                      !(
                        o.aH.isReadersAttention(t) ||
                        o.aH.isReadersAttentionHelp(t)
                      ) &&
                      i.heatmap.visible.get() &&
                      i.heatmap.visible.set(false);
                })
              ),
                !o.aH.isReadersAttention(t) ||
                (e && o.aH.isReadersAttentionHelp(e))
                  ? !(
                      o.aH.isReadersAttention(t) ||
                      o.aH.isReadersAttentionHelp(t)
                    ) &&
                    e &&
                    (o.aH.isReadersAttention(e) ||
                      o.aH.isReadersAttentionHelp(e)) &&
                    this._trackOnReadersAttentionHide()
                  : this._trackOnReadersAttentionShow(t.caller);
            });
        }
        _trackChecklistItemExpand() {
          return this._assistantLensState
            .pipe(
              p.U((e) =>
                (0, n.pipe)(
                  w.fromPredicate(T.nL.hasItems)(e),
                  w.map(T.nL.Prism.getLens().get),
                  w.filter((e) => e.id === _.R.SpecialId.PredictionTakeaways),
                  w.chain(T.In.getActiveItemOfType(M.d.isChecklistItem)),
                  w.map((e) => {
                    return {
                      id:
                        ((t = e.id),
                        (i = _.R.SpecialId.PredictionTakeaways),
                        I.T.Id.create(t.substr(i.length + 1) || t)),
                      title: (0, n.pipe)(
                        e.itemMeta.miniTitle,
                        w.getOrElse(() => e.itemMeta.title)
                      ),
                      checked:
                        M.d.isChecklistItemEmpty(e) && e.itemMeta.checked,
                      numAlerts: M.d.isChecklistItemWithAlerts(e)
                        ? e.alerts.length
                        : 0,
                    };
                    var t, i;
                  })
                )
              ),
              A.skipBy(w.getEq(R.Uz((e) => e.id)(R.yv))),
              p.U(w.getOrElse(s.gn)),
              m.h(y.fQ)
            )
            .subscribe((e) =>
              (0, n.pipe)(
                this._readersAttentionFeature,
                x.bw((t) => t.tracking.onChecklistItemExpand(e))
              )
            );
        }
        _trackOnReadersAttentionShow(e) {
          (0, n.pipe)(
            this._readersAttentionFeature,
            w.chain((e) =>
              (0, n.pipe)(
                a.g(w.option)(e.panelInfo.get(), G(this._checklist.get())),
                w.map((t) => ({
                  feature: e,
                  predictionMessage: t[0].predictionMessage,
                  checklistInfo: t[1],
                }))
              )
            ),
            x.bw(({ feature: t, predictionMessage: i, checklistInfo: a }) => {
              t.tracking.onOpen(a, i, this._getNumAlerts(), e);
            })
          );
        }
        _trackOnReadersAttentionHide() {
          (0, n.pipe)(
            this._readersAttentionFeature,
            w.chain((e) =>
              (0, n.pipe)(
                G(this._checklist.get()),
                w.map((t) => ({ feature: e, checklistInfo: t }))
              )
            ),
            x.bw(({ feature: e, checklistInfo: t }) => {
              e.tracking.onClose(t, this._getNumAlerts());
            })
          );
        }
        _trackOnShowHelp() {
          (0, n.pipe)(
            this._readersAttentionFeature,
            x.bw((e) => {
              e.tracking.onHelpScreenShow();
            })
          );
        }
        _getNumAlerts() {
          return (0, n.pipe)(
            this._alertsCollection.get(),
            c.p.reduce({ takeaway: 0, nonTakeaway: 0 }, (e, t) => {
              const i = l.bZ.isTakeaway(t.alert),
                a = l.bZ.belongsToPredictionTakeaways(t.alert) && !i;
              return {
                takeaway: e.takeaway + (i ? 1 : 0),
                nonTakeaway: e.nonTakeaway + (a ? 1 : 0),
              };
            })
          );
        }
      }
      function G(e) {
        const t = Array.from(e.values()).sort((e, t) => e.rank - t.rank);
        return (0, n.pipe)(
          t.map((e) => ({
            checked: w.isNone(e.suggestionsView) && e.emptyView.checked,
            message: (0, n.pipe)(
              e.suggestionsView,
              w.map((e) =>
                (0, n.pipe)(
                  e.miniTitle,
                  w.getOrElse(() => e.title)
                )
              ),
              w.getOrElse(() =>
                (0, n.pipe)(
                  e.emptyView.miniTitle,
                  w.getOrElse(() => e.emptyView.title)
                )
              )
            ),
          })),
          r.nI
        );
      }
    },
    31536: (e, t, i) => {
      i.d(t, { X: () => a });
      class a {
        constructor(e, t, i) {
          (this._contentScriptState = e),
            (this._contentScriptActions = t),
            (this.domain = i),
            (this.state = this._contentScriptState.view((e) => ({
              user: e.user,
              commonSettings: e.page,
              dynamicConfig: e.dynamicConfig,
            }))),
            (this.actions = {
              toggleSite: (e, t) =>
                this._contentScriptActions.toggleSite({
                  enabled: e,
                  domain: t,
                }),
              toggleDefs: this._contentScriptActions.toggleDefs,
              toggleAutocomplete: this._contentScriptActions.toggleAutocomplete,
              toggleAutocorrect: this._contentScriptActions.toggleAutocorrect,
              toggleReader: this._contentScriptActions.toggleReader,
              changeStrongDialect:
                this._contentScriptActions.changeStrongDialect,
              setDesktopIntegration:
                this._contentScriptActions.setDesktopIntegration,
            });
        }
      }
    },
    68654: (e, t, i) => {
      i.d(t, { _2: () => I, fM: () => E, qS: () => T, yS: () => M });
      var a = i(57050),
        s = i(40327),
        r = i(51972),
        n = i(16868),
        o = i(66896),
        l = i(40018),
        c = i(15646),
        d = i(35416),
        u = i(74364),
        p = i(66310),
        m = i(91402),
        h = i(40151),
        g = i(76974),
        v = i(77176),
        f = i(85985),
        w = i(78674),
        b = i(60797),
        S = i(28043),
        y = i(41398),
        _ = i(22232),
        k = i(5114),
        A = i(83078),
        C = i(95195);
      function E(e, t, i, a, r) {
        return {
          id: "changeAlertEffect",
          when: o.R.isWithAlertsId,
          what: d.nL.Effect.SwitchAlert.create(
            e.actionEvents.pipe(
              p.w((e) => {
                const n = t.get();
                if (!d.nL.hasCards(n))
                  return m._(new _.ej("Cannot update state without cards"));
                switch (e.type) {
                  case c.lY.Type.alertMinicardButtonClick:
                    return (0, s.pipe)(
                      i.getRegistered(e.alertHighlight.alert.id),
                      k.fold(
                        () => (
                          r.warn(
                            "somehow we got click on non registered alert",
                            e.alertHighlight.alert
                          ),
                          h.E
                        ),
                        () => g.of(e.alertHighlight)
                      )
                    );
                  case c.lY.Type.cardMatchesNavigationButtonClick:
                    const t = e.transitionTo;
                    switch (t.kind) {
                      case "anotherAlert":
                        return (0, s.pipe)(
                          "right" === e.direction
                            ? a.nextAlert(t.card)
                            : (0, s.pipe)(
                                a.prevAlert(t.card),
                                A.vx(a.anyRegisteredAlert(t.card))
                              ),
                          k.fold(
                            () => h.E,
                            (e) => g.of({ alert: e, highlightIndex: 0 })
                          )
                        );
                      case "sameAlert":
                        return (0, s.pipe)(
                          i.getRegistered(t.card.activeAlert.id),
                          k.fold(
                            () => h.E,
                            () =>
                              g.of({
                                alert: t.card.activeAlert,
                                highlightIndex: t.highlightIndex,
                              })
                          )
                        );
                      default:
                        return (0, _.vE)(t);
                    }
                  default:
                    return h.E;
                }
              }),
              v.U((e) => ({
                alertHighlight: e,
                alertSource: l.l$.sidebar,
                options: { order: "lensOrder" },
              }))
            )
          ),
        };
      }
      function I(e, t, i) {
        const a = e.pipe(
          f.h(d.nL.hasCards),
          w.b(0),
          v.U((e) => e),
          f.h(
            (e) =>
              e.currentLens.items.size > 0 &&
              k.isNone(d.In.getActiveItem(e.currentLens)) &&
              i.get()
          ),
          v.U((e) =>
            (0, s.pipe)(
              e.currentLens.items.getAt(0),
              k.chain(
                r.O.checksFeedItemsMapper(
                  (e) => k.some(e.activeAlert),
                  (e) => k.some(e.activeAlert),
                  () => k.none,
                  () => k.none,
                  () => k.none
                )
              ),
              A.bw(() => t.set(k.some(n.CV.skip)))
            )
          ),
          b.oA,
          f.h((e) => e.state.type === l.bZ.State.Type.REGISTERED),
          S.x()
        );
        return {
          id: "focusFirstCardSideEffect",
          when: (e) =>
            e !== o.R.SpecialId.PredictionTakeaways &&
            e !== o.R.SpecialId.PredictionEmogenie,
          what: d.nL.Effect.SwitchLens.create(
            a.pipe(
              y.M(e),
              v.U(([e, t]) => ({
                lensId: t.currentLens.id,
                alertSource: l.l$.text,
                options: {
                  order: "lensOrder",
                  toFocus: d.nL.Effect.FocusBehavior.focusAlert({
                    alert: e,
                    highlightIndex: 0,
                  }),
                },
              }))
            )
          ),
        };
      }
      function M(e, t, i) {
        const r = e.pipe(
          v.U(
            (e) => (a) =>
              e.type === u.ay.Type.AppliedAlertAnimationFinished &&
              a.currentLens.meta.filter(e.alert) &&
              d.nL.hasItems(a)
                ? a.patch({
                    currentLens: (0, s.pipe)(
                      C.Y3(
                        () =>
                          l.bZ.isApplicableAlert(e.alert)
                            ? t.finishApplyAnimation([e.alert])(a.currentLens)
                            : a.currentLens,
                        (e) =>
                          i.error(
                            "could not update lens state on applied animation finish",
                            e
                          )
                      ),
                      C.fS(() => a.currentLens)
                    ),
                    alertSource: e.alert.state.source,
                  })
                : a
          )
        );
        return {
          id: "onAlertApply",
          when: a.W8,
          what: d.nL.Effect.Applicator.create(r),
        };
      }
      function T(e, t) {
        return {
          id: "lensChangeEffect",
          when: a.W8,
          what: d.nL.Effect.SwitchLens.create(
            e.pipe(
              y.M(t),
              f.h(([e, t]) => e.lensId !== t),
              v.U(([e]) => ({
                lensId: e.lensId,
                alertSource: l.l$.sidebar,
                options: {
                  order: "lensOrder",
                  toFocus: e.focusFirstCard
                    ? d.nL.Effect.FocusBehavior.focusFirst
                    : d.nL.Effect.FocusBehavior.noFocus,
                },
              }))
            )
          ),
        };
      }
    },
    40033: (e, t, i) => {
      i.d(t, { fA: () => u, pL: () => _ });
      var a = i(40327),
        s = i(27378),
        r = i(41354),
        n = i(79921),
        o = i(19217);
      const l = ({
        message: e,
        emoji: t,
        emojiId: i,
        icon: a,
        iconPartName: r,
      }) =>
        s.createElement(
          "div",
          { className: o.insight },
          t &&
            i &&
            s.createElement(
              "div",
              { className: o.insight__inline_icon },
              s.createElement(n.dy, { unicodeHexArray: [i], unicodeLiteral: t })
            ),
          a &&
            s.createElement(
              "div",
              { className: o.insight__inline_icon, "data-grammarly-part": r },
              a
            ),
          s.createElement("div", { className: o.insight__inline_text }, e)
        );
      var c = i(53112);
      const d = () =>
        s.createElement(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          s.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z",
            fill: c.Z.red50,
          }),
          s.createElement("path", {
            d: "M8.94827 4H7.05196L7.22242 10.1108H8.78208L8.94827 4ZM8.00225 12.8381C8.5477 12.8381 9.02071 12.3821 9.02498 11.8153C9.02071 11.2571 8.5477 10.8011 8.00225 10.8011C7.43975 10.8011 6.97526 11.2571 6.97952 11.8153C6.97526 12.3821 7.43975 12.8381 8.00225 12.8381Z",
            fill: c.Z.neutral0,
          })
        );
      var u,
        p = i(46547),
        m = i(88326),
        h = i(90361),
        g = i(61922),
        v = i(3656),
        f = i(77176),
        w = i(18208),
        b = i(5739),
        S = i(31881),
        y = i(98029);
      !(function (e) {
        (e.hidden = "hidden"), (e.zero = "zero"), (e.visible = "visible");
      })(u || (u = {}));
      const _ = ({ predictionsVM: e }) => S.UI.mount(M, e.previewFlow),
        k = S.UI.Grid.make(({ slots: e }) =>
          s.createElement(
            "div",
            { className: y.predictions },
            s.createElement(
              "div",
              { className: y.predictions__header },
              "Predictions"
            ),
            e.children
          )
        ),
        A = ({ children: e, count: t, dataPartName: i }) =>
          s.createElement(
            p.Z,
            {
              kind: "assistant-priority-lens",
              dataPartName: i,
              marginBottom: "12px",
            },
            s.createElement(
              "div",
              { className: y.predictions__card },
              e,
              t > 0 &&
                s.createElement(
                  "div",
                  { className: y.counterContainer },
                  s.createElement(v.CL, null, t)
                )
            )
          ),
        C = S.UI.Node.make(({ state: e, notify: t }) =>
          s.createElement(
            m.M,
            { clickHandler: t("select") },
            s.createElement(
              b.F.Fragment,
              null,
              e.pipe(
                f.U((e) =>
                  s.createElement(
                    A,
                    {
                      count: e.alertsCount,
                      dataPartName: "emogenie-prediction-card",
                    },
                    s.createElement(l, {
                      key: "tone",
                      message:
                        "off" === e.emotion.brandToneLabel
                          ? s.createElement(
                              s.Fragment,
                              null,
                              "May sound ",
                              s.createElement(
                                "span",
                                { className: y.predictions__off_brand },
                                "off-brand"
                              )
                            )
                          : `Sounds ${e.emotion.name}`,
                      emoji: e.emotion.emoji,
                      emojiId: e.emotion.emojiId,
                    })
                  )
                )
              )
            )
          )
        ),
        E = S.UI.Node.make(({ state: e, notify: t }) =>
          s.createElement(
            m.M,
            { clickHandler: t("select") },
            s.createElement(
              b.F.Fragment,
              null,
              e.pipe(
                f.U((e) =>
                  s.createElement(
                    A,
                    {
                      count: e.alertsCount,
                      dataPartName: "readers-attention-prediction-card",
                    },
                    s.createElement(l, {
                      key: "readersAttention",
                      message: w.kC(e.message),
                      icon:
                        e.icon === r.d.ok
                          ? s.createElement(g.JO.ValidationOk, { width: 16 })
                          : e.icon === r.d.warning
                          ? s.createElement(d, null)
                          : e.icon === r.d.feedback
                          ? s.createElement(g.JO.Megaphone, { width: 16 })
                          : (0, h.vE)(e.icon),
                      iconPartName:
                        e.icon === r.d.ok
                          ? "icon-ok"
                          : e.icon === r.d.warning
                          ? "icon-warning"
                          : e.icon === r.d.feedback
                          ? "icon-feedback"
                          : (0, h.vE)(e.icon),
                    })
                  )
                )
              )
            )
          )
        ),
        I = S.UI.Group.make({ tone: T(C), readersAttention: T(E) }),
        M = S.UI.Union.make("kind", {
          [u.hidden]: S.UI.Node.empty,
          [u.zero]: S.UI.Node.empty,
          [u.visible]: S.UI.Composite.make(k, I),
        });
      function T(e) {
        return {
          tag: "_tag",
          members: {
            Some: (0, a.pipe)(
              e,
              S.UI.contramapState((e) => e.value)
            ),
            None: S.UI.Node.empty,
          },
        };
      }
    },
    15090: (e, t, i) => {
      i.d(t, { g: () => a });
      var a,
        s = i(40327),
        r = i(85985),
        n = i(15646),
        o = i(83078);
      !(function (e) {
        e.createSubscription = function (e, t, i) {
          return e.pipe(r.h(n.lY.isAlertApplyAction)).subscribe((e) =>
            (0, s.pipe)(
              i(e.alertId),
              o.bw((e) => {
                "unlocked" === o.Fc(e.extraProperties.freePremium) &&
                  t.freePremiumSuggestionAcceptButtonClick("assistant");
              })
            )
          );
        };
      })(a || (a = {}));
    },
    45662: (e, t, i) => {
      i.d(t, { c: () => s });
      var a = i(41186);
      class s {
        constructor(e) {
          this._highlights = e;
        }
        addHighlight(e, t, i) {
          return this._highlights.addHighlight(e, t, i);
        }
        updateHighlight(e, t, i) {
          return this._highlights.updateHighlight(e, t, i);
        }
        removeHighlights(e) {
          return this._highlights.removeHighlights(e);
        }
        recalculateHighlight(e) {
          return this._highlights.recalculateHighlight(e);
        }
        recalculateAllHighlights() {
          return this._highlights.recalculateAllHighlights();
        }
        maintainConsistency(e, t = (e) => e, i = false) {
          return this._highlights.maintainConsistency(e, t, i);
        }
        hasHighlight(e) {
          return this._highlights.hasHighlight(e);
        }
        getSelectedHighlightsTracker(e) {
          return (0, a.H)({ ...e, highlights: this._highlights });
        }
        getGeometryByHighlightId(e) {
          return this._highlights.geometry.get().get(e);
        }
      }
    },
    65060: (e, t, i) => {
      i.d(t, { g: () => a, m: () => p });
      var a,
        s = i(57050),
        r = i(48439),
        n = i(36156),
        o = i(16892),
        l = i(48521),
        c = i(4890),
        d = i(73975),
        u = i(5114);
      !(function (e) {
        (e.id = "ReadersAttentionItemId"),
          (e.kind = "ReadersAttentionItem"),
          (e.eq = d.f7(
            (e, t) =>
              e.hashCode() === t.hashCode() &&
              o.s.PositionState.eq.equals(e.positionState, t.positionState) &&
              l.o.VisualState.eq.equals(e.visualState, t.visualState)
          )),
          (e.hashCodeOwnFields = (e) =>
            (0, n.NO)({
              title: e.title,
              description: e.description,
              details: (0, s.zG)(
                e.details,
                u.fold(
                  () => "none",
                  (e) => `some(${e})`
                )
              ),
              attentionScore: r.T.prism.reverseGet(e.attentionScore),
            })),
          (e.hashCode = e.hashCodeOwnFields),
          (e.create = function (t, i, a) {
            return {
              id: e.id,
              kind: e.kind,
              renderOptions: {
                ...c.j.defaultOptions,
                layoutDensity: c.j.Density.minimal,
              },
              positionState: i,
              visualState: a,
              title: t.title,
              description: t.description,
              details: t.details,
              attentionScore: t.attentionScore,
              equals(t) {
                return e.eq.equals(this, t);
              },
              hashCode() {
                return e.hashCode(this);
              },
            };
          });
      })(a || (a = {}));
    },
    16314: (e, t, i) => {
      var a;
      i.d(t, {
        Dy: () => a,
        Q: () => n,
        RJ: () => o,
        Vl: () => s,
        l9: () => r,
      }),
        (function (e) {
          (e.miniCardClick = "readersAttentionItemMiniCardClick"),
            (e.ignoreButtonClick = "readersAttentionItemIgnoreButtonClick"),
            (e.viewMoreButtonClick = "readersAttentionItemViewMoreButtonClick"),
            (e.feedbackButtonClick = "readersAttentionItemFeedbackButtonClick");
        })(a || (a = {}));
    },
    35501: (e, t, i) => {
      i.d(t, { h: () => h, r: () => g });
      var a = i(27378),
        s = i(76457),
        r = i(3656),
        n = i(77176),
        o = i(48439),
        l = i(8125),
        c = i(5739),
        d = i(12187),
        u = i(16027),
        p = i(35630);
      const m = ({ progress: e }) =>
          a.createElement(
            c.F.Fragment,
            null,
            e.pipe(
              n.U((e) =>
                a.createElement(s.P, {
                  percentage: o.g.prism.reverseGet(e),
                  colorType: s.P.ColorType.neoBlue,
                  iconSize: s.P.IconSize.extraSmall,
                  theme: {
                    radialProgressBar: p.circleProgress,
                    radialProgressText: p.circleText,
                  },
                })
              )
            )
          ),
        h = (e) =>
          u.UI.Node.make(({ view: t }) =>
            a.createElement(
              c.F.div,
              {
                ...(0, d.Sh)(
                  p.header,
                  t("density").pipe(
                    n.U((e) => "normal" === e),
                    n.U((0, l.RN)(p.normal, p.compact))
                  )
                ),
              },
              a.createElement(
                "div",
                { className: p.progressIcon },
                a.createElement(m, {
                  progress: t("attentionScore").pipe(n.U(o.g.fromRatio)),
                })
              ),
              a.createElement(
                r.XY,
                { ...(0, d.Sh)(p.title, "full" === e ? p.full : void 0) },
                t("title")
              )
            )
          ),
        g = u.UI.Node.make(({ view: e }) =>
          a.createElement(
            a.Fragment,
            null,
            a.createElement(
              "div",
              {
                className: p.progressContainer,
                "data-name": "attention-score-progress-bar",
              },
              a.createElement(
                c.F.div,
                {
                  className: p.progressBar,
                  style: {
                    width: e("attentionScore").pipe(
                      n.U(o.g.fromRatio),
                      n.U(o.g.prism.reverseGet),
                      n.U((e) => `${e}%`)
                    ),
                  },
                },
                a.createElement(
                  r.XY,
                  {
                    className: p.progressValue,
                    "data-name": "attention-score-progress-value",
                  },
                  e("attentionScore").pipe(
                    n.U(o.g.fromRatio),
                    n.U(o.g.prism.reverseGet),
                    n.U((e) => `${e}%`)
                  )
                )
              )
            ),
            a.createElement(
              r.XY,
              { className: p.description },
              e("attentionScoreDescription")
            )
          )
        );
    },
    86620: (e, t, i) => {
      i.d(t, { C: () => c, U: () => a });
      var a,
        s = i(27378),
        r = i(29511),
        n = i(33678),
        o = i(88056),
        l = i(95574);
      !(function (e) {
        let t;
        !(function (e) {
          e.isAppleSystem = "isAppleSystem";
        })((t = e.SidebarFlag || (e.SidebarFlag = {}))),
          (e.Flag = { ...t, ...n.a.Flag }),
          (e.Context = s.createContext(o.Y.invariantContent("Environment")));
      })(a || (a = {}));
      class c {
        constructor(e = (0, r.O)()) {
          (this._flags = new Set()),
            (this.actions = {
              openUrl: (e) =>
                l.vM(() => {
                  document.location.href = e.toString();
                }),
              openPopup: (e) =>
                l.vM(() => {
                  const t = self.open(e.toString(), void 0, "noreferrer");
                  t && (t.opener = null);
                }),
            }),
            e.config.systemInfo.os.isMac &&
              this._flags.add(a.Flag.isAppleSystem),
            this._flags.add(a.Flag.supportsSVGDominantBaseline),
            this._flags.add(a.Flag.onlyTrustedEvents);
        }
        has(e) {
          return this._flags.has(e);
        }
      }
    },
    90989: (e, t, i) => {
      i.d(t, { I: () => c, S: () => a });
      var a,
        s = i(27378),
        r = i(41572),
        n = i(88056),
        o = i(19429),
        l = i(35407);
      !(function (e) {
        (e.Context = s.createContext(
          n.Y.invariantContent("SidebarTextResources")
        )),
          (e.holder = o.VF(() => ({
            logoText: "GRAMMARLY",
            plagiarismTooltip: "Scan for plagiarism",
            setGoalsTooltip: "Adjust goals",
            statisticsTooltip: "See performance",
          })));
      })(a || (a = {}));
      const c = l.GG({ denali: r.m.holder, sidebar: a.holder });
    },
    25575: (e, t, i) => {
      i.d(t, { o: () => d });
      var a = i(27378);
      if (3075 == i.j) var s = i(53112);
      if (3075 == i.j) var r = i(24606);
      if (3075 == i.j) var n = i(3656);
      var o = i(96807);
      const l = ({ gnar: e, onSignIn: t, showSignInReminder: i }) =>
          a.createElement(
            a.Fragment,
            null,
            a.createElement(
              n.CL,
              { className: o.cardText, color: s.Z.neutral90 },
              i
                ? "Sign back in to use Grammarly with ease and get access to key Grammarly features."
                : "To continue to apply Grammarly suggestions by simply clicking on them, you’ll need to create an account. Don’t worry, it’s free."
            ),
            a.createElement(
              r.z,
              {
                kind: "success",
                size: "small",
                onClick: () => {
                  e.anonymousGDocsSidebarSignInCardButtonClick("gdocsSidebar"),
                    t();
                },
              },
              "Sign in"
            )
          ),
        c = ({ gnar: e, onCreateAccount: t }) =>
          a.createElement(
            a.Fragment,
            null,
            a.createElement(
              n.CL,
              { className: o.cardText, color: s.Z.neutral90 },
              "To continue to apply Grammarly suggestions by simply clicking on them, you'll need to sign into your account."
            ),
            a.createElement(
              r.z,
              {
                kind: "success",
                size: "small",
                onClick: () => {
                  e.anonymousGDocsSidebarSignUpCardButtonClick("gdocsSidebar"),
                    t();
                },
              },
              "Create account"
            )
          ),
        d = ({
          gnar: e,
          isUserLoggedOut: t,
          showSignInReminder: i,
          onSignIn: s,
          onCreateAccount: r,
        }) =>
          a.createElement(
            "div",
            { className: o.cardContainer },
            a.createElement(n.H4, null, "Better Writing in Google Docs"),
            t
              ? a.createElement(l, {
                  gnar: e,
                  onSignIn: s,
                  showSignInReminder: i,
                })
              : a.createElement(c, { gnar: e, onCreateAccount: r })
          );
    },
    10720: (e, t, i) => {
      i.d(t, { US: () => j, hz: () => W, ux: () => G });
      var a = i(57050),
        s = i(27378),
        r = i(51972),
        n = i(2027),
        o = i(66896),
        l = i(89894),
        c = i(68579),
        d = i(36156),
        u = i(71841),
        p = i(74238),
        m = i(99116),
        h = i(35416),
        g = i(18955),
        v = i(77176),
        f = i(98403),
        w = i(32952),
        b = i(93508),
        S = i(76974),
        y = i(2844),
        _ = i(60797),
        k = i(24209),
        A = i(18625),
        C = i(66310),
        E = i(40151),
        I = i(85089),
        M = i(2834),
        T = i(95093),
        x = i(24713),
        R = i(85985),
        L = i(49708),
        F = i(17343),
        P = i(19751),
        V = i(5114),
        B = i(19962),
        O = i(5739),
        N = i(81531),
        D = i(31881),
        U = i(47476);
      const H = D.UI.Grid.make(({ slots: e, view: t }) =>
        s.createElement(
          O.F.div,
          { style: { marginBottom: t("spacing").pipe(v.U(l.ux.rem)) } },
          e.children
        )
      );
      function j(e) {
        switch (e) {
          case o.R.SpecialId.PredictionTakeaways:
          case o.R.SpecialId.Priority:
            return 0.75;
          default:
            return 1;
        }
      }
      const W = s.forwardRef(
          (
            {
              state: e,
              cardsViewModel: t,
              cardsListScrollManager: i,
              connectorElements: o,
              header: l,
              footer: p,
              capabilities: m,
              comparator: v,
              readersAttentionItemViewModel: y,
            },
            _
          ) => {
            const k = f
                .jw((e) => {
                  let t = 7;
                  return (
                    (t = 31 * t + (0, d.AC)(e.currentLens.id)),
                    (t = 31 * t + (h.nL.hasItems(e) ? 1231 : 1237)),
                    t
                  );
                }, e)
                .view((e) =>
                  h.nL.hasItems(e.get()) ? e.view(h.nL.Prism.getLens()) : null
                )
                .view((e) => (e ? { state: e, spacing: j(e.get().id) } : null)),
              A = s.useContext(n.Dg).state;
            return s.createElement(
              g.d,
              {
                className: S.of(""),
                name: "cardlist",
                stateSyncListener: z(i, o, A),
                height: G(e, i, m),
                isMaster: true,
              },
              s.createElement(
                s.Fragment,
                null,
                l
                  ? s.createElement(
                      O.F.div,
                      {
                        className: U.headerOrFooterWrapper,
                        mount: (e) => o.lens("title").set(V.fromNullable(e)),
                      },
                      l
                    )
                  : null,
                s.createElement(
                  O.F.div,
                  { mount: _ },
                  k.view((e) => {
                    return e
                      ? D.UI.mount(
                          ((s = e.spacing),
                          (0, a.zG)(
                            c.A.cardList(r.O.item(t.actionEvents)),
                            D.UI.patch(
                              "content",
                              "cell",
                              "item"
                            )((e) =>
                              (0, a.zG)(
                                D.UI.Knot.make(H, { children: e.child }),
                                D.UI.squash,
                                D.UI.contramapState((e) => ({
                                  children: e,
                                  root: { spacing: s },
                                })),
                                D.UI.mapAction((e) => e.action)
                              )
                            )
                          )),
                          ((e) =>
                            (0, a.zG)(
                              r.O.createCardListFlow(y)(
                                t,
                                e,
                                new w.xQ(),
                                u.i$(i).pipe(b.O(false)),
                                m,
                                v
                              )
                            ))(e.state)
                        )
                      : null;
                    var s;
                  })
                ),
                p
                  ? s.createElement(
                      O.F.div,
                      { className: U.headerOrFooterWrapper },
                      p
                    )
                  : null
              )
            );
          }
        ),
        G = (e, t, i) => {
          const a = (0, m.Sd)(i)(
            e.view(
              h.nL.mapper(({ currentLens: e, alertSource: t }) =>
                V.some({ currentLens: e, alertSource: t })
              )
            )
          );
          return y
            .aj([
              a.pipe(
                _.oA,
                v.U(({ currentLens: e }) => e.cardsHeight),
                b.O(0)
              ),
              t.paddingTop,
            ])
            .pipe(v.U(([e, t]) => e + t));
        },
        z = (e, t, i) => {
          const a = N.C8.Logging.getLogger("view_models");
          return k
            .T(
              A.P(() => {
                e.paddingTop.set(0);
              }),
              t.view("viewport").pipe(
                C.w(
                  V.fold(
                    () => E.E,
                    (e) =>
                      I.YC(e).pipe(
                        M.b(() =>
                          a.debug(
                            "update card list viewport due to viewport resize event"
                          )
                        ),
                        T.T(
                          i.pipe(
                            x.j("dragging"),
                            R.h((e) => !e),
                            C.w(f.b2.rafScheduler),
                            M.b(() =>
                              a.debug(
                                "update card list viewport due to drag end event"
                              )
                            )
                          )
                        ),
                        v.U(() => e.getBoundingClientRect()),
                        v.U((e) => ({
                          top: p.r.FromWindowTop.ISO.wrap(e.top),
                          height: e.height,
                        }))
                      )
                  )
                ),
                M.b(f.wW(e.viewport))
              ),
              t.view("scrollProvider").pipe(
                C.w(
                  V.fold(
                    () => E.E,
                    (t) =>
                      L.R(t, "scroll").pipe(
                        v.U(() => t.scrollTop),
                        b.O(t.scrollTop),
                        M.b(f.wW(e.scrollTop)),
                        F.h(f.PU)
                      )
                  )
                )
              ),
              t.view("title").pipe(
                C.w(
                  V.fold(
                    () => S.of(B.UL.empty),
                    (e) => I.YC(e)
                  )
                ),
                v.U((e) => e.height),
                P.shareReplay({ bufferSize: 1, refCount: true }),
                M.b(f.wW(e.paddingTop))
              ),
              t.view("scrollConsumer").pipe(
                C.w(
                  V.fold(
                    () => E.E,
                    (t) =>
                      e.scrollOffset.pipe(
                        M.b((e) => {
                          t.scrollTop += e;
                        })
                      )
                  )
                )
              )
            )
            .pipe(F.h(void 0));
        };
    },
    68340: (e, t, i) => {
      i.d(t, { C: () => F, S: () => L });
      var a = i(40327),
        s = i(18756),
        r = i(27378),
        n = i(51972),
        o = i(10720),
        l = i(101),
        c = i(66896),
        d = i(40489),
        u = i(25975),
        p = i(18955),
        m = i(98403),
        h = i(60797),
        g = i(77176),
        v = i(19962),
        f = i(5114),
        w = i(5739),
        b = i(31881),
        S = i(74880),
        y = i(57050),
        _ = i(73582),
        k = i(38819),
        A = i(19106),
        C = i(30509);
      const E = ({ upgradeViewModel: e }) => {
        const t = e.advancedAlerts.pipe(
          g.U((0, y.ls)(f.map((e) => ({ count: e.count, alerts: e.alerts() }))))
        );
        return r.createElement(
          w.F.div,
          { className: C.premiumLens },
          b.UI.mount(
            k.r,
            b.Z.fromSideEffect((t) => {
              "upgrade" === t.action.action.action.kind &&
                (A.J.getPremiumButtonClick(
                  "gDocsSidebarAssistantSuccessView",
                  "GoPremium"
                ),
                e.openUpgradeUrl(_.L.Place.gdocsSidebarSuccessView));
            }, t)
          )
        );
      };
      var I = i(41572),
        M = i(89379),
        T = i(28378),
        x = i(879);
      const R = ({ successLensViewModel: e }) => {
          const t = (0, M.hM)(
            (0, M.wK)(e.successState.view("type"), r.useContext(I.m.Context))
          );
          return r.createElement(
            w.F.div,
            { className: x.successLens },
            b.UI.mount(T.q, t)
          );
        },
        L = r.forwardRef(
          (
            {
              state: e,
              cardsViewModel: t,
              upgradeViewModel: i,
              cardsListScrollManager: a,
              capabilities: l,
              upgradeHookFlow: p,
              ...h
            },
            g
          ) => {
            const v = m.jw((e) => {
              let t = 7;
              return (
                (t = 31 * t + (0, s.AC)(e.currentLens.id)),
                (t =
                  31 * t +
                  (u.v.WithSuccess.State.isInSuccess(l)(e) ? 1231 : 1237)),
                t
              );
            }, e);
            return r.createElement(F, { ref: g }, (e) =>
              r.createElement(
                w.F.Fragment,
                null,
                v.view((s) => {
                  const m = s.get();
                  return m.currentLens.id === c.R.SpecialId.Premium
                    ? r.createElement(E, { upgradeViewModel: i })
                    : u.v.WithSuccess.State.isInSuccess(l)(m)
                    ? r.createElement(R, {
                        successLensViewModel: h.successLensViewModel,
                      })
                    : r.createElement(
                        "div",
                        null,
                        r.createElement(o.hz, {
                          state: s,
                          cardsViewModel: t,
                          cardsListScrollManager: a,
                          connectorElements: e,
                          header: b.UI.mount(d.n.TogglablePanel, p),
                          comparator: n.O.listItemOrd,
                          capabilities: l,
                          readersAttentionItemViewModel: f.none,
                        })
                      );
                })
              )
            );
          }
        ),
        F = r.forwardRef(
          (
            { children: e, onClick: t, className: i = S.cardList, footer: s },
            n
          ) => {
            const o = p.d.Elements.create(),
              c = (0, a.pipe)(o.view("viewport"), h.oA, g.U(v.UL.fromEl));
            return r.createElement(
              "div",
              {
                onClick: t,
                className: i,
                ref: (e) => {
                  "function" == typeof n ? n(e) : n && (n.current = e);
                  const t = f.fromNullable(e);
                  o.lens("scrollConsumer").set(t),
                    o.lens("scrollProvider").set(t),
                    o.lens("viewport").set(t);
                },
              },
              r.createElement(
                l.l.RootVirtualContainer,
                { name: "cardListConnector", viewport: c },
                e(o)
              ),
              s
            );
          }
        );
    },
    1309: (e, t, i) => {
      i.d(t, { Z: () => c });
      var a = i(27378);
      if (3075 == i.j) var s = i(62295);
      if (3075 == i.j) var r = i(61922);
      if (3075 == i.j) var n = i(66896);
      if (3075 == i.j) var o = i(5739);
      var l = i(57731);
      const c = ({ lensPreviewViewModel: e }) => {
          const t = e.getLens(n.R.SpecialId.AllAlerts).view((e) => e.count);
          return a.createElement(
            o.F.div,
            { className: l.footer },
            a.createElement(d, { activeAlerts: t })
          );
        },
        d = ({ activeAlerts: e }) =>
          a.createElement(
            o.F.Fragment,
            null,
            e.view((e) =>
              e > 0
                ? a.createElement(s.x.OutcomeCounter, {
                    count: e,
                    theme: {
                      counterWrapper: l.counterWrapper,
                      counterContent: l.counter,
                    },
                  })
                : a.createElement(r.JO.CheckmarkOutcomes, {
                    className: l.counterCheckmarkIcon,
                  })
            )
          );
    },
    74928: (e, t, i) => {
      i.d(t, { $l: () => I });
      var a = i(27378);
      if (3075 == i.j) var s = i(77394);
      if (3075 == i.j) var r = i(90989);
      if (3075 == i.j) var n = i(22667);
      if (3075 == i.j) var o = i(64757);
      if (3075 == i.j) var l = i(61922);
      if (3075 == i.j) var c = i(81301);
      if (3075 == i.j) var d = i(3656);
      if (3075 == i.j) var u = i(66896);
      if (3075 == i.j) var p = i(40018);
      if (3075 == i.j) var m = i(40743);
      if (3075 == i.j) var h = i(87667);
      if (3075 == i.j) var g = i(92644);
      if (3075 == i.j) var v = i(15774);
      if (3075 == i.j) var f = i(89186);
      if (3075 == i.j) var w = i(84317);
      if (3075 == i.j) var b = i(77176);
      if (3075 == i.j) var S = i(85985);
      if (3075 == i.j) var y = i(22232);
      if (3075 == i.j) var _ = i(8125);
      if (3075 == i.j) var k = i(5114);
      if (3075 == i.j) var A = i(12187);
      var C = i(31881),
        E = i(21831);
      const I = ({
          state: e,
          navigationViewModel: t,
          modalManager: i,
          lensPreviewViewModel: r,
          features: n,
        }) => {
          switch (n.priorityLens.kind) {
            case s.h.Kind.dropdown:
              return a.createElement(M, {
                state: e,
                navigationViewModel: t,
                modalManager: i,
                lensPreviewViewModel: r,
              });
            case s.h.Kind.priorityToggle:
              return a.createElement(T, {
                state: e,
                navigationViewModel: t,
                modalManager: i,
                lensPreviewViewModel: r,
                defaultMode: n.priorityLens.defaultMode,
              });
            case s.h.Kind.none:
              return a.createElement(x, {
                navigationViewModel: t,
                modalManager: i,
              });
            default:
              (0, y.vE)(n.priorityLens);
          }
        },
        M = ({
          state: e,
          navigationViewModel: t,
          modalManager: i,
          lensPreviewViewModel: s,
        }) =>
          a.createElement(
            "div",
            { className: E.priorityLensHeader },
            a.createElement(R, { navigationViewModel: t, modalManager: i }),
            a.createElement(
              "div",
              { className: E.prioritySwitchWrapper },
              C.UI.mount(
                h.n.Switch,
                (0, g.i)(s, t, e.pipe(b.U((e) => e.currentLens.id)))
              )
            )
          ),
        T = ({
          state: e,
          navigationViewModel: t,
          modalManager: i,
          lensPreviewViewModel: s,
          defaultMode: r,
        }) =>
          a.createElement(
            "div",
            { className: E.priorityLensHeader },
            a.createElement(R, { navigationViewModel: t, modalManager: i }),
            a.createElement(
              "div",
              { className: E.prioritySwitchFlatWrapper },
              C.UI.mount(
                f.B.DefaultHeader,
                (0, w.HP)(
                  t,
                  e.pipe(
                    b.U((e) => e.currentLens.id),
                    S.h((0, _.Kg)(u.R.isPriority, u.R.isAllAlerts))
                  ),
                  "priority" === r ? v.H.LensMode.priority : v.H.LensMode.all,
                  "compact",
                  s,
                  10
                )
              )
            )
          ),
        x = ({ navigationViewModel: e, modalManager: t }) =>
          a.createElement(
            "div",
            { className: E.defaultHeader },
            a.createElement(R, { navigationViewModel: e, modalManager: t }),
            a.createElement(
              "div",
              { ...(0, A.Sh)(E.lensNavigation, E.disabledLensNavigation) },
              C.UI.mount(
                m.C,
                C.Z.fromSideEffect(
                  (t) => {
                    e.events.next({
                      type: "switchToLens",
                      id: t.lens.id,
                      focusFirst: false,
                      actionSource: p.l$.sidebar,
                    });
                  },
                  {
                    activeLensId: k.none,
                    previews: Object.values(e.lensPreviews.get()).filter(
                      (e) => e.id !== u.R.SpecialId.Vox
                    ),
                    disabled: false,
                  }
                )
              )
            )
          ),
        R = ({ navigationViewModel: e, modalManager: t }) => {
          const i = a.useContext(r.S.Context),
            s = t.state.view(
              k.exists((e) => e.instance.type === c.dC.SetGoals)
            );
          return a.createElement(
            "div",
            { className: E.head },
            a.createElement(
              "div",
              { className: E.headerGroup },
              a.createElement(n.K, { className: E.logoIcon, size: 18 }),
              a.createElement(d.H5, { className: E.logoText }, i.logoText)
            ),
            a.createElement(
              o.zx.Flat,
              {
                name: "setGoals",
                className: E.setGoalsButton,
                title: i.setGoalsTooltip,
                titleAlign: "bottomCenter",
                active: s,
                disabled: s,
                onClick: () => e.events.next({ type: "setGoals" }),
              },
              a.createElement(l.JO.GoalsEmpty, { width: 24 })
            ),
            a.createElement(
              "div",
              { className: E.headerGroup },
              a.createElement("div", { className: E.divider }),
              a.createElement(
                o.zx.Flat,
                {
                  name: "closeSidebar",
                  onClick: () =>
                    e.events.next({
                      type: "toggleSidebar",
                      actionSource: p.l$.sidebar,
                    }),
                },
                a.createElement(l.JO.Close, { width: 16 })
              )
            )
          );
        };
    },
    1473: (e, t, i) => {
      i.d(t, { R: () => c });
      var a = i(27378);
      if (3075 == i.j) var s = i(22667);
      if (3075 == i.j) var r = i(3656);
      if (3075 == i.j) var n = i(40018);
      var o = i(44617);
      const l = () =>
          a.createElement(
            "svg",
            { width: "11", height: "11", viewBox: "0 0 12 13", fill: "none" },
            a.createElement("path", {
              d: "M0.5 1L6 6.5M11.5 12L6 6.5M6 6.5L11.5 1M6 6.5L0.5 12",
              strokeLinecap: "round",
              strokeWidth: "1.5",
            })
          ),
        c = ({ navigationViewModel: e }) =>
          a.createElement(
            "div",
            { className: o.header },
            a.createElement(
              "div",
              { className: o.headerGroup },
              a.createElement(
                "div",
                { className: o.logoIcon },
                a.createElement(s.K, null)
              ),
              a.createElement(r.H5, null, "Grammarly")
            ),
            a.createElement(
              "div",
              { className: o.headerGroup },
              a.createElement(
                "div",
                {
                  className: o.closeButton,
                  onClick: () => {
                    e.events.next({
                      type: "toggleSidebar",
                      actionSource: n.l$.sidebar,
                    });
                  },
                  role: "button",
                },
                a.createElement(l, null)
              )
            )
          );
    },
    80550: (e, t, i) => {
      i.d(t, { L: () => o });
      var a = i(57050),
        s = i(27378),
        r = i(5114),
        n = i(5739);
      const o = ({ modalManager: e }) =>
        s.createElement(
          n.F.Fragment,
          null,
          e.state.view(
            (0, a.ls)(
              r.map(({ component: e }) => e),
              r.toNullable
            )
          )
        );
    },
    11177: (e, t, i) => {
      i.d(t, { P: () => o });
      var a = i(27378),
        s = i(50790),
        r = i(30543),
        n = i(32380);
      const o = {
          unauthorizedError: (e, t) =>
            a.createElement(r.s.UnauthorizedError, { action: t("gotoLogin") }),
          offline: () => a.createElement(l, null),
          alertUndo: (e, t) =>
            a.createElement(n.A.Standard, {
              action: t("undo"),
              params: e.args.params,
            }),
        },
        l = () =>
          a.createElement(
            s.DI.TitledContent,
            { title: "Lost Connection" },
            "Your Internet session was interrupted."
          );
    },
    92132: (e, t, i) => {
      i.d(t, { Q: () => l });
      var a = i(27378),
        s = i(15073),
        r = i(60797),
        n = i(95300),
        o = i(5114);
      const l = ({ children: e, remSize: t, setter: i }) => (
        (c += 1),
        a.useEffect(() => {
          const e = t.subscribe((e) => {
            d.next(o.some(e)), i(o.some(e));
          });
          return () => {
            e.unsubscribe(), (c -= 1), 0 === c && (d.next(o.none), i(o.none));
          };
        }, [t]),
        a.createElement(s.u.Context.Provider, { value: d.pipe(r.oA) }, e)
      );
      let c = 0;
      const d = new n.X(o.none);
    },
    9025: (e, t, i) => {
      i.d(t, { _: () => r });
      var a = i(27378);
      if (3075 == i.j) var s = i(94071);
      const r = ({ children: e, className: t }) =>
        a.createElement(
          "div",
          {
            className: t,
            style: {
              position: "fixed",
              right: "0px",
              top: "0px",
              bottom: "0px",
              width: s.xK,
              zIndex: 1e3,
              background: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100vh",
            },
          },
          e
        );
    },
    94071: (e, t, i) => {
      i.d(t, { H2: () => r, iB: () => a, kl: () => n, xK: () => s });
      const a = ".docs-companion-sidebar",
        s = "300px";
      var r;
      !(function (e) {
        (e.selector = ".companion-guest-app-switcher .app-switcher-button"),
          (e.selectedClass = "app-switcher-button-selected"),
          (e.selectedSelector = `.${e.selectedClass}`),
          (e.activeClass = "app-switcher-button-active"),
          (e.hoverClass = "app-switcher-button-hover"),
          (e.disabledClass = "app-switcher-button-disabled");
      })(r || (r = {}));
      const n = ".companion-about-panel-button";
    },
    94663: (e, t, i) => {
      i.d(t, { I: () => n });
      var a = i(5802),
        s = i(41966);
      const r = {
        priority: a.P.Priority.highest,
        timeout: a.P.TimeoutDisabled,
        position: a.P.Position.top,
        viewType: a.P.ViewType.standard,
      };
      var n;
      !(function (e) {
        e.createFactory = function () {
          return {
            alertUndo: s.r
              .createBuilder()
              .build({
                priority: a.P.Priority.low,
                timeout: a.P.DefaultTimeout,
                position: a.P.Position.bottomRight,
                viewType: a.P.ViewType.standard,
              }),
            unauthorizedError: s.r.createBuilder().build(r),
            offline: s.r.createBuilder().build(r),
          };
        };
      })(n || (n = {}));
    },
    70091: (e, t, i) => {
      if ((i.d(t, { U9: () => F, jv: () => V }), 3075 == i.j)) var a = i(32138);
      var s = i(27378);
      if (3075 == i.j) var r = i(3295);
      if (3075 == i.j) var n = i(86620);
      if (3075 == i.j) var o = i(90989);
      if (3075 == i.j) var l = i(25575);
      if (3075 == i.j) var c = i(68340);
      if (3075 == i.j) var d = i(1309);
      if (3075 == i.j) var u = i(74928);
      if (3075 == i.j) var p = i(1473);
      if (3075 == i.j) var m = i(80550);
      if (3075 == i.j) var h = i(11177);
      if (3075 == i.j) var g = i(92132);
      if (3075 == i.j) var v = i(9025);
      if (3075 == i.j) var f = i(50981);
      var w = i(48189),
        b = i(49468);
      if (3075 == i.j) var S = i(64078);
      if (3075 == i.j) var y = i(42103);
      if (3075 == i.j) var _ = i(33678);
      if (3075 == i.j) var k = i(15073);
      if (3075 == i.j) var A = i(41572);
      if (3075 == i.j) var C = i(47861);
      if (3075 == i.j) var E = i(90845);
      if (3075 == i.j) var I = i(76974);
      if (3075 == i.j) var M = i(8313);
      var T = i(79850),
        x = i(75259),
        R = i(67129);
      const L = ({
        state: e,
        gnar: t,
        user: i,
        anonymousFrictionGDocsService: n,
        cardsViewModel: o,
        navigationViewModel: m,
        successLensViewModel: g,
        upgradeViewModel: f,
        cardsListScrollManager: w,
        notificationManager: b,
        lensPreviewViewModel: S,
        modalManager: y,
        features: _,
        capabilities: k,
        upgradeHookFlow: A,
      }) => {
        const [E, I] = s.useState(i.view("anonymous").get());
        return (
          s.useEffect(() => {
            const e = i.view("anonymous").subscribe((e) => {
              I(e);
            });
            return () => e.unsubscribe();
          }, []),
          E && n.peekTreatment()
            ? s.createElement(
                v._,
                { className: R.sidebarContainer },
                s.createElement(p.R, { navigationViewModel: m }),
                s.createElement(
                  "section",
                  { className: R.sidebarContent },
                  s.createElement(l.o, {
                    gnar: t,
                    showSignInReminder: n.isInTreatmentWithOneLockedSuggestion,
                    isUserLoggedOut: n.anonymousUserType === r.q.LoggedOut,
                    onCreateAccount: () => {
                      self.open(
                        (0, a.Xc)("signupHook", "gdocsSidebarAnonymousCard")
                      );
                    },
                    onSignIn: () => {
                      self.open((0, a.s7)());
                    },
                  })
                )
              )
            : s.createElement(
                v._,
                { className: R.sidebarContainer },
                s.createElement(u.$l, {
                  state: e,
                  navigationViewModel: m,
                  modalManager: y,
                  lensPreviewViewModel: S,
                  features: _,
                }),
                s.createElement(c.S, {
                  cardsViewModel: o,
                  state: e,
                  successLensViewModel: g,
                  upgradeViewModel: f,
                  cardsListScrollManager: w,
                  capabilities: k,
                  upgradeHookFlow: A,
                }),
                "none" !== _.priorityLens.kind
                  ? null
                  : s.createElement(d.Z, { lensPreviewViewModel: S }),
                s.createElement(C.i, {
                  key: "notificationCenter",
                  manager: b,
                  views: h.P,
                  theme: {
                    grid: {
                      container: x.container,
                      bottomLeft: x.bottomLeft,
                      bottomRight: x.bottomRight,
                      top: x.top,
                    },
                    view: { wrapper: x.notificationWrapper },
                  },
                })
              )
        );
      };
      function F(e) {
        return ({
            integration: t,
            sidebarReady: i,
            shortenItFeature: a,
            ethicalAIFeature: r,
            cardEvents: o,
            user: l,
            anonymousFrictionGDocsService: c,
          }) =>
          () => {
            const d = t.engine,
              u = new n.C(),
              {
                lensState: p,
                cardsViewModel: h,
                navigationViewModel: g,
                successLensViewModel: v,
                upgradeViewModel: w,
                dispose: b,
                cardsListScrollManager: y,
                notificationManager: _,
                lensPreviewViewModel: k,
                modalManager: A,
                capabilities: C,
                upgradeHookFlow: I,
              } = (0, f.G)(
                d,
                t.denaliViewAdapter,
                e,
                t.connectionState,
                t.gnar,
                t.user,
                l,
                t.document.settings.lens("selectedLens"),
                t.features,
                i,
                a,
                r,
                o,
                t.experimentClient
              );
            return (
              E.P.useEffectOnWillUnmount(() => {
                d.shutdown(), b();
              }),
              s.createElement(
                P,
                { environment: u },
                s.createElement(L, {
                  anonymousFrictionGDocsService: c,
                  user: l,
                  gnar: t.gnar,
                  state: p,
                  cardsViewModel: h,
                  navigationViewModel: g,
                  successLensViewModel: v,
                  upgradeViewModel: w,
                  cardsListScrollManager: y,
                  notificationManager: _,
                  lensPreviewViewModel: k,
                  modalManager: A,
                  features: t.features,
                  capabilities: C,
                  upgradeHookFlow: I,
                }),
                s.createElement(m.L, { modalManager: A }),
                s.createElement(S.X, null)
              )
            );
          };
      }
      const P = ({ environment: e, children: t }) => {
          const i = s.useRef(
            (0, o.I)(
              A.m.getConfig(e.has(n.U.Flag.isAppleSystem) ? "mac" : "windows")
            )
          );
          return s.createElement(
            g.Q,
            {
              remSize: I.of(16),
              setter: (e) => k.u.setRootCssVar(document.documentElement, e),
            },
            s.createElement(
              n.U.Context.Provider,
              { value: e },
              s.createElement(
                _.a.Context.Provider,
                { value: e },
                s.createElement(
                  o.S.Context.Provider,
                  { value: i.current.sidebar },
                  s.createElement(
                    A.m.Context.Provider,
                    { value: i.current.denali },
                    s.createElement(
                      M.TG.ContextMock,
                      null,
                      s.createElement(
                        y.G.DefaultProvider,
                        null,
                        s.createElement(V, null, t)
                      )
                    )
                  )
                )
              )
            )
          );
        },
        V = ({ children: e }) =>
          s.createElement(
            s.Fragment,
            null,
            s.createElement(
              b.o,
              { "data-grammarly-part": "gdocs-sidebar", className: T.wrapper },
              e
            ),
            s.createElement(w.p, {
              thin: true,
              thinItalic: true,
              regular: true,
              italic: true,
              bold: true,
              boldItalic: true,
              semiBold: true,
            })
          );
    },
    16868: (e, t, i) => {
      i.d(t, { CV: () => N, hp: () => O, k9: () => D });
      var a = i(57050),
        s = i(40327),
        r = i(74850),
        n = i(59443),
        o = i(40018),
        l = i(66896),
        c = i(18625),
        d = i(60797),
        u = i(77176),
        p = i(66310),
        m = i(17343),
        h = i(98403),
        g = i(91224),
        v = i(40151),
        f = i(38194),
        w = i(76974),
        b = i(24209),
        S = i(93508),
        y = i(16118),
        _ = i(85985),
        k = i(28043),
        A = i(41398),
        C = i(83401),
        E = i(598),
        I = i(25980),
        M = i(58562),
        T = i(74238),
        x = i(99116),
        R = i(4890),
        L = i(35416),
        F = i(5114),
        P = i(83078),
        V = i(38983);
      class B {
        constructor(e, t) {
          (this._cardPositions = e),
            (this._markPositions = t),
            (this._log = r.Y.create(B.name));
        }
        alignCardToMark(
          {
            id: e,
            renderOptions: { features: t },
            activeAlert: i,
            activeHighlightIndex: a,
          },
          r
        ) {
          return c
            .P(() =>
              this._markPositions.getMarkAlertPosition({
                alert: i,
                highlightIndex: a,
              })
            )
            .pipe(
              d.oA,
              u.U((i) =>
                (0, s.pipe)(
                  this._cardPositions.getCardSuggestedPositionInViewport(
                    e,
                    t.has(R.j.Features.showLabel),
                    F.some(i),
                    "cardContentTop"
                  ),
                  F.fromEither
                )
              ),
              d.oA,
              p.w((i) =>
                this._cardPositions.setCardPosition(
                  e,
                  t.has(R.j.Features.showLabel),
                  true,
                  i.top
                )
              ),
              m.h(h.PU),
              g.K(
                (e) => (this._log.error("Cannot align card to mark", e), v.E)
              ),
              f.B()
            );
        }
        alignMarkTo(e, t, i, a) {
          return c
            .P(() =>
              w
                .of(
                  (0, s.pipe)(
                    this._cardPositions.getCardSuggestedPositionInViewport(
                      e.id,
                      e.renderOptions.features.has(R.j.Features.showLabel),
                      F.some(i),
                      "cardContentTop"
                    ),
                    F.fromEither
                  )
                )
                .pipe(d.oA)
            )
            .pipe(
              p.w((i) =>
                b.T(
                  this._markPositions.moveAlertHighlightInViewport(
                    t,
                    T.r.FromWindowTop.ISO.modify(T.L.concatC(i.contentOffset))(
                      i.top
                    ),
                    n.uq.initial
                  ),
                  this._cardPositions.setCardPosition(
                    e.id,
                    e.renderOptions.features.has(R.j.Features.showLabel),
                    true,
                    i.top
                  )
                )
              ),
              m.h(h.PU),
              g.K(
                (e) => (
                  this._log.error("Cannot align mark to suggested position", e),
                  v.E
                )
              ),
              f.B()
            );
        }
        alignMarkToCard(
          {
            id: e,
            renderOptions: { features: t },
            activeHighlightIndex: i,
            activeAlert: a,
          },
          r,
          o = F.none
        ) {
          return c
            .P(() =>
              w
                .of(
                  (0, s.pipe)(
                    this._cardPositions.getCardSuggestedPositionInViewport(
                      e,
                      t.has(R.j.Features.showLabel),
                      o,
                      "cardContentTop"
                    ),
                    F.fromEither
                  )
                )
                .pipe(d.oA)
            )
            .pipe(
              p.w((s) =>
                b.T(
                  this._markPositions.moveAlertHighlightInViewport(
                    { alert: a, highlightIndex: i },
                    T.r.FromWindowTop.ISO.modify(T.L.concatC(s.contentOffset))(
                      s.top
                    ),
                    n.uq.initial
                  ),
                  this._cardPositions.setCardPosition(
                    e,
                    t.has(R.j.Features.showLabel),
                    true,
                    s.top
                  )
                )
              ),
              m.h(h.PU),
              g.K(
                (e) => (this._log.error("Cannot align mark to card", e), v.E)
              ),
              f.B()
            );
        }
        alignCardTo(e, t, i) {
          const a = i !== I.v.Animation.NO_ANIMATION;
          return c
            .P(() =>
              w
                .of(
                  (0, s.pipe)(
                    this._cardPositions.getCardSuggestedPosition(
                      e.id,
                      e.renderOptions.features.has(R.j.Features.showLabel),
                      F.some(t),
                      "cardTop"
                    ),
                    F.fromEither
                  )
                )
                .pipe(d.oA)
            )
            .pipe(
              p.w((t) =>
                this._cardPositions.setCardPosition(
                  e.id,
                  e.renderOptions.features.has(R.j.Features.showLabel),
                  a,
                  t.top
                )
              ),
              m.h(h.PU),
              g.K(
                (e) => (
                  this._log.error("Cannot align card to required top", e), v.E
                )
              ),
              f.B()
            );
        }
      }
      const O = (e, t, i, a, s, r) =>
        new B(
          M.eZ.getSuperScrollMapper(e, a, V.h.create(16)),
          M.UC.getMapper(t, s, r)
        );
      var N;
      !(function (e) {
        e.skip = "skip";
      })(N || (N = {}));
      const D = (e, t, i, r, n, c = h.b2.rafScheduler) => {
        const d = (e, i, a, s) => {
            if (a === o.l$.text)
              return t.alignCardToMark(
                e,
                i ? I.v.Animation.ANIMATE_ALL : I.v.Animation.NO_ANIMATION,
                true
              );
            if (a === L.h8.forceText)
              return t.alignCardToMark(e, I.v.Animation.NO_ANIMATION, false);
            {
              const r = a === o.l$.sidebar;
              return t.alignMarkToCard(
                e,
                r
                  ? i
                    ? I.v.Animation.ANIMATE_ALL
                    : I.v.Animation.ANIMATE_MARK
                  : I.v.Animation.NO_ANIMATION,
                s
              );
            }
          },
          g = b
            .T(
              e
                .view(
                  L.nL.mapper(({ currentLens: e, alertSource: t }) =>
                    F.some({ currentLens: e, alertSource: t })
                  )
                )
                .pipe(
                  S.O(F.none),
                  u.U(F.map((e) => e.currentLens.id)),
                  y.G(),
                  _.h(([e, t]) =>
                    (0, s.pipe)(P.vB((e, t) => e !== t)(e, t), F.exists(a.yR))
                  ),
                  m.h(F.none)
                ),
              e
                .view(
                  L.nL.mapper(({ currentLens: e, alertSource: t }) =>
                    F.some({ currentLens: e, alertSource: t })
                  )
                )
                .pipe(
                  _.h(F.exists(({ currentLens: e }) => (0, x.Bk)(n)(e))),
                  u.U(
                    F.chain(({ currentLens: e, alertSource: t }) =>
                      (0, s.pipe)(
                        r(e),
                        F.filter(n.isValidToAlign),
                        F.map((i) => ({ item: i, source: t, lensId: e.id }))
                      )
                    )
                  )
                )
            )
            .pipe(
              k.x(
                (0, a.ls)(
                  P.vB(
                    (e, t) =>
                      e.lensId === t.lensId &&
                      e.item.activeAlert.id === t.item.activeAlert.id &&
                      e.item.visualState.transition.type ===
                        t.item.visualState.transition.type &&
                      e.item.activeHighlightIndex ===
                        t.item.activeHighlightIndex
                  ),
                  F.exists(a.yR)
                )
              ),
              S.O(F.none),
              y.G(),
              u.U(([e, t]) =>
                (0, s.pipe)(
                  t,
                  F.map((i) => ({
                    item: i.item,
                    source: i.source,
                    animate: (0, s.pipe)(
                      e,
                      P.wo(({ lensId: e }) => e === i.lensId)
                    ),
                    suggestedPosition: (0, s.pipe)(
                      e,
                      F.filter((e) => !n.isScheduledToDispose(e.item)),
                      F.chain((e) =>
                        (0, s.pipe)(
                          t,
                          F.map((t) => [e.item, t.item])
                        )
                      ),
                      F.filter(
                        ([e, t]) =>
                          t.lensId === e.lensId &&
                          t.positionState.absTop > e.positionState.absTop
                      ),
                      F.map(([e, t]) =>
                        T.r.FromWindowTop.ISO.wrap(t.positionState.absTop)
                      )
                    ),
                  }))
                )
              ),
              p.w(F.fold(() => v.E, c)),
              A.M(i),
              p.w(
                ([
                  { item: e, source: t, animate: a, suggestedPosition: r },
                  n,
                ]) =>
                  (0, s.pipe)(
                    n,
                    F.fold(
                      () => d(e, a, t, r),
                      (t) => (i.set(F.none), t === N.skip ? C.C : d(e, a, t, r))
                    )
                  )
              )
            );
        return {
          id: "alignmentSideEffect",
          when: l.R.isWithAlertsId,
          what: L.nL.Effect.Applicator.create(g.pipe(E.c(C.C))),
        };
      };
    },
    93829: (e, t, i) => {
      if ((i.d(t, { C: () => n }), 3075 == i.j)) var a = i(9671);
      if (3075 == i.j) var s = i(15090);
      if (3075 == i.j) var r = i(9922);
      class n {
        constructor(e, t, i) {
          (this._cardsViewModel = e),
            (this._gnar = t),
            (this._getAlertById = i),
            (this._subs = new r.w.Keeper()),
            this.subscribeToSidebarCardActions();
        }
        subscribeToSidebarCardActions() {
          this._subs.push(
            s.g.createSubscription(
              this._cardsViewModel.actionEvents,
              this._gnar,
              this._getAlertById
            ),
            (0, a.t)(this._cardsViewModel.actionEvents, this._gnar, "gdocs")
          );
        }
        dispose() {
          this._subs.dispose();
        }
      }
    },
    51540: (e, t, i) => {
      i.d(t, { A7: () => A, CH: () => I, Ng: () => E, uo: () => C });
      var a = i(57050),
        s = i(66896),
        r = i(40018),
        n = i(55935),
        o = i(66310),
        l = i(40151),
        c = i(76974),
        d = i(85985),
        u = i(41398),
        p = i(77176);
      if (3075 == i.j) var m = i(28043);
      if (3075 == i.j) var h = i(598);
      if (3075 == i.j) var g = i(83401);
      if (3075 == i.j) var v = i(13444);
      if (3075 == i.j) var f = i(57091);
      if (3075 == i.j) var w = i(16118);
      var b = i(35416);
      if (3075 == i.j) var S = i(25975);
      var y = i(5114);
      if (3075 == i.j) var _ = i(83078);
      if (3075 == i.j) var k = i(38983);
      function A(e, t, i) {
        return {
          id: "alertSwitchingByClickSideEffect",
          when: a.W8,
          what: b.nL.Effect.SwitchAlert.create(
            e.alertClicked.pipe(
              n.T(1),
              o.w(y.fold(() => l.E, c.of)),
              d.h((e) => !i || e.alert.lensId !== s.R.SpecialId.Premium),
              u.M(
                t.pipe(
                  d.h(b.nL.hasCards),
                  p.U((e) => e.currentLens.id)
                ),
                (e, t) => ({ ...e, lensId: t })
              ),
              p.U(({ alert: e, highlightIndex: t, lensId: i }) => ({
                alertHighlight: { alert: e, highlightIndex: t },
                alertSource: r.l$.text,
                options: { lensId: i, order: "textOrder" },
              }))
            )
          ),
        };
      }
      function C(e, t) {
        return {
          id: "connectionManager",
          when: () => true,
          what: b.nL.Effect.SwitchAlert.create(
            e.pipe(
              p.U((e) => e.online),
              m.x(),
              o.w((e) =>
                e
                  ? l.E
                  : t.enqueue("offline", { reconnectTime: k.h.create(10) })
              ),
              h.c(g.C)
            )
          ),
        };
      }
      function E(e, t, i) {
        const a = e.getLens(s.R.SpecialId.Premium).pipe(
          p.U((e) => e.count > 0),
          m.x()
        );
        return {
          id: "autoSwitchToPremiumLensSideEffect",
          when: (e) =>
            e === s.R.SpecialId.AllAlerts || e === s.R.SpecialId.Priority,
          what: b.nL.Effect.SwitchLens.create(
            t.pipe(
              p.U(S.v.WithSuccess.State.isInSuccess(i)),
              m.x(),
              v.g(1),
              f.a(a),
              d.h(([e, t]) => e && t),
              p.U(() => ({
                lensId: s.R.SpecialId.Premium,
                alertSource: r.l$.sidebar,
                options: { toFocus: b.nL.Effect.FocusBehavior.noFocus },
              }))
            )
          ),
        };
      }
      function I(e, t) {
        const i = e.getLens(s.R.SpecialId.AllAlerts).pipe(
            p.U((e) => e.count > 0),
            m.x()
          ),
          n = e.getLens(s.R.SpecialId.Priority).pipe(
            p.U((e) => e.count > 0),
            m.x()
          );
        return {
          id: "autoSwitchFromPremiumLensSideEffect",
          when: a.W8,
          what: b.nL.Effect.SwitchLens.create(
            t.pipe(
              p.U((e) => e.currentLens.id),
              m.x(),
              w.G(),
              d.h(([e, t]) => t === s.R.SpecialId.Premium),
              p.U(([e, t]) => e),
              f.a(i, n),
              p.U(([e, t, i]) =>
                e === s.R.SpecialId.Priority && i
                  ? y.some(s.R.SpecialId.Priority)
                  : e === s.R.SpecialId.AllAlerts && t
                  ? y.some(s.R.SpecialId.AllAlerts)
                  : y.none
              ),
              d.h(y.isSome),
              p.U(_.MH),
              p.U((e) => ({
                lensId: e,
                alertSource: r.l$.sidebar,
                options: { toFocus: b.nL.Effect.FocusBehavior.noFocus },
              }))
            )
          ),
        };
      }
    },
    7680: (e, t, i) => {
      i.d(t, { D: () => a });
      var a,
        s = i(40327),
        r = i(73353),
        n = i(5114),
        o = i(55415);
      !(function (e) {
        e.updateCitationStyle = (e, t) => (i) => {
          const a = (0, s.pipe)(
              e.defaultContext.get(),
              n.getOrElse(() => r.R$.defaultContextFallback)
            ),
            l = (0, s.pipe)(
              e.context.get(),
              r.R$.OutcomeContext.withCitationStyle(i)
            );
          (0, s.pipe)(l, e.updateContext) &&
            t.goalsFormSuccess(
              (0, s.pipe)(
                l.domain,
                n.getOrElse(() => a.domain)
              ),
              (0, s.pipe)(
                l.goals,
                n.getOrElse(() => a.goals),
                (e) => Array.from(e)
              ),
              "essayDetectionCard",
              (0, s.pipe)(l.outcomeContext, n.map(o.ei("type")), n.toUndefined),
              void 0,
              (0, s.pipe)(
                l.outcomeContext,
                n.map(o.ei("citation")),
                n.toUndefined
              ),
              void 0
            );
        };
      })(a || (a = {}));
    },
    50981: (e, t, i) => {
      if ((i.d(t, { G: () => ge }), 3075 == i.j)) var a = i(57050);
      if (3075 == i.j) var s = i(40327);
      if (3075 == i.j) var r = i(50622);
      if (3075 == i.j) var n = i(58809);
      if (3075 == i.j) var o = i(32154);
      if (3075 == i.j) var l = i(51972);
      if (3075 == i.j) var c = i(10299);
      if (3075 == i.j) var d = i(77394);
      if (3075 == i.j) var u = i(86620);
      if (3075 == i.j) var p = i(94663);
      if (3075 == i.j) var m = i(93829);
      if (3075 == i.j) var h = i(7680);
      if (3075 == i.j) var g = i(62346);
      if (3075 == i.j) var v = i(37290);
      if (3075 == i.j) var f = i(73582);
      if (3075 == i.j) var w = i(33953);
      if (3075 == i.j) var b = i(88661);
      if (3075 == i.j) var S = i(92783);
      if (3075 == i.j) var y = i(44618);
      if (3075 == i.j) var _ = i(81301);
      if (3075 == i.j) var k = i(61813);
      if (3075 == i.j) var A = i(66896);
      if (3075 == i.j) var C = i(13313);
      if (3075 == i.j) var E = i(70023);
      if (3075 == i.j) var I = i(40489);
      if (3075 == i.j) var M = i(98403);
      if (3075 == i.j) var T = i(76974);
      if (3075 == i.j) var x = i(77176);
      if (3075 == i.j) var R = i(85985);
      if (3075 == i.j) var L = i(2834);
      if (3075 == i.j) var F = i(17343);
      if (3075 == i.j) var P = i(28043);
      if (3075 == i.j) var V = i(66310);
      if (3075 == i.j) var B = i(40151);
      if (3075 == i.j) var O = i(21619);
      if (3075 == i.j) var N = i(54216);
      if (3075 == i.j) var D = i(15701);
      if (3075 == i.j) var U = i(48052);
      if (3075 == i.j) var H = i(91549);
      if (3075 == i.j) var j = i(4330);
      if (3075 == i.j) var W = i(20594);
      if (3075 == i.j) var G = i(35607);
      if (3075 == i.j) var z = i(20291);
      if (3075 == i.j) var q = i(34383);
      if (3075 == i.j) var K = i(11245);
      if (3075 == i.j) var Z = i(4890);
      if (3075 == i.j) var X = i(35416);
      if (3075 == i.j) var Y = i(25975);
      if (3075 == i.j) var Q = i(73841);
      if (3075 == i.j) var $ = i(89770);
      if (3075 == i.j) var J = i(39920);
      if (3075 == i.j) var ee = i(17372);
      if (3075 == i.j) var te = i(74364);
      if (3075 == i.j) var ie = i(27125);
      if (3075 == i.j) var ae = i(5114);
      if (3075 == i.j) var se = i(83078);
      if (3075 == i.j) var re = i(95195);
      if (3075 == i.j) var ne = i(8125);
      if (3075 == i.j) var oe = i(95574);
      if (3075 == i.j) var le = i(38983);
      if (3075 == i.j) var ce = i(81531);
      var de = i(16027);
      if (3075 == i.j) var ue = i(16868);
      if (3075 == i.j) var pe = i(51540);
      if (3075 == i.j) var me = i(40081);
      if (3075 == i.j) var he = i(780);
      const ge = (e, t, i, ge, ve, fe, we, be, Se, ye, _e, ke, Ae, Ce) => {
        const Ee = ce.C8.Logging.getLogger("view_models"),
          Ie = le.h.create(C.A.defaultState),
          Me = le.h.create(false),
          Te = N.t.create(N.t.defaultLensFilters, N.t.defaultTextFilters),
          xe = e.alertsList.state
            .pipe((t) => C.A.get(t, e.alertsList.lensesScores, Te))
            .subscribe(M.wW(Ie)),
          Re = new me.t(Ie.view("lenses"), Te, e.sessionModel.scoreStatus),
          Le = (0, U.$y)((0, y.a)(t).getContents),
          Fe = {
            features: (() => {
              const e = new Set();
              return e.add(W.IG.Features.showCardLabelInOutcomes), e;
            })(),
            cardLayoutDensityMode: Z.j.Density.compact,
            shouldAnimateAlertApply: a.jv,
            cardVisualMode: le.h.create(Z.j.CardVisualMode.RegularLightMode),
          },
          Pe = (0, W.Ls)(
            Le,
            e.alertsReader,
            Fe,
            () => T.of(ae.none),
            e.mutingAlertsReader
          ),
          Ve = H.R.ItemFactory.create(Le, e.mutingAlertsReader, Fe, () =>
            T.of(ae.none)
          ),
          Be = (0, K.U)(Le, e.alertsReader, Fe, q.T.ordAlert),
          Oe = l.O.getCapabilities(
            Pe,
            Ve,
            Be,
            e.alertsReader,
            Le,
            le.h.create(q.D.empty()),
            () => Ue.get().currentLens.id
          ),
          Ne = new $.oq(
            e.alertsList.state,
            e.alertsReader,
            Ie.view("lenses"),
            e.positionManager,
            Re,
            new J.gi(l.O.equatable.structEq, l.O.defaultOrd),
            (0, J.is)(Pe, Oe),
            Oe,
            Te
          ),
          De = A.R.SpecialId.AllAlerts;
        i.next({ kind: d.R.ChangeLens, selectedLens: "all" });
        const Ue = le.h.create(Ne.emptyState(De)),
          He = Ue.pipe(
            x.U((e) => e.currentLens.id),
            R.h(n.U.SelectedLens.filter)
          ).subscribe((e) => be.set(e)),
          je = (0, j.u0)(() => t.getCursor().index, Ne),
          We = new f.x(e.alertsList, Ue, 5),
          Ge = new w.r(e.alertsList, Ue),
          ze = new _.EQ(
            new he.o(
              e.sessionModel,
              We,
              fe.isPremium,
              ve,
              Ce.isGateEnabled(b.K.StudentsOFEGdocs) ||
                Ce.isGateEnabled(b.K.StudentsOFEInternal)
            )
          ),
          qe = new v.$(Ue, Re, i, ze, t, Se, ve, ee.z.all),
          Ke = new D.Xx(
            { flush: () => t.flushChanges() },
            qe.events,
            Pe,
            e.alertsService,
            ae.none,
            () => Promise.resolve(),
            () => Promise.resolve(),
            (0, s.pipe)(
              e.mutedAlertsCategoriesModel,
              ae.map((e) => ({
                model: e,
                openSuggestionsManagement: () =>
                  self.open((0, S.Um)().suggestionsSettings),
              }))
            ),
            ae.none,
            () => false,
            l.O.getActiveItemWithAlert,
            Oe,
            Ue,
            new u.C(),
            { bufferTransitions: true, showGbPrompt: false },
            ae.none,
            h.D.updateCitationStyle(e.sessionModel, ve)
          ),
          Ze = new m.C(Ke, ve, e.alertsReader.getById),
          Xe = (0, c.z)(we.get(), Ce),
          Ye = (0, s.pipe)(
            (0, E.d)(We.advancedAlerts),
            de.Z.extendActions(
              L.b((e) => {
                e.key === I.n.State.minimized &&
                  "onClick" === e.action.action &&
                  Xe &&
                  Me.set(true),
                  e.key === I.n.State.expanded &&
                    "collapse" === e.action.kind &&
                    Me.set(false),
                  e.key === I.n.State.expanded &&
                    "upgrade" === e.action.kind &&
                    (ve.getPremiumButtonClick(
                      "gDocsSideBarAssistantList",
                      "SeeWhatsInPremium"
                    ),
                    We.openUpgradeUrl(f.L.Place.gdocsSidebarCardList));
              })
            )
          ),
          Qe = Me.pipe(F.h(M.PU)),
          $e = Ge.freeAlerts
            .pipe(
              x.U((e) => {
                var t;
                return (
                  !(null === (t = (0, s.pipe)(e, se.Fc)) || void 0 === t
                    ? void 0
                    : t.count) && Xe
                );
              }),
              P.x()
            )
            .subscribe(M.wW(Me)),
          Je = (0, g.xl)(Ue, Te, Qe, Me),
          et = new g.o$(
            e.alertsList,
            e.alertsReader,
            e.positionManager,
            e.alertsService,
            t,
            Ue,
            Je,
            l.O.getActiveItemWithAlert,
            ye,
            false,
            Me
          ),
          tt = new G.o(() => re.F2(void 0)),
          it = (0, ue.hp)(Ue, et, le.h.create(16), tt, t, Ee),
          at = new O.mN(t, Ue, et, e.alertsReader, l.O.getActiveItemWithAlert),
          st = new k.y(le.h.create([]), p.I.createFactory(), 3, 5e3),
          rt = [
            D.dv.changeAlertEffect(
              Ue,
              Ke,
              Pe,
              l.O.getActiveItemWithAlert,
              e.alertsReader,
              ae.some(it),
              je,
              Ee.getLogger("CardsViewModelEffects.changeAlertEffect")
            ),
            ...Ke.getApplicatorEffects(),
            z.R7(Ue, tt, Oe, (0, a.MZ)(Ke.actionEvents), {
              cardsAroundActive: 25,
              cardsBeyondViewport: 25,
            }),
            pe.A7(at, Ue),
            (0, ue.k9)(
              Ue,
              it,
              le.h.create(ae.none),
              l.O.getActiveAlignableItem,
              Oe
            ),
            z.XU(Ue, tt, Oe),
            te.EQ.focusMarkByActiveAlert(
              Ue,
              et,
              e.alertsReader,
              l.O.getActiveFocusableItem,
              Ee.getLogger("MarksEffects.focusMarkByActiveAlert")
            ),
            pe.uo(ge, st),
            D.dv.createSendActiveAlertFeedbacksEffect(
              Ue,
              l.O.getActiveItemWithAlert,
              e.alertsService,
              e.alertsReader,
              Ee.getLogger(
                "CardsViewModelEffects.createSendActiveAlertFeedbacksEffect"
              )
            ),
            pe.Ng(Re, Ue, Oe),
            pe.CH(Re, Ue),
            qe.lensChangeEffect,
          ],
          nt =
            "none" !== Se.priorityLens.kind
              ? qe.lensMode
                  .view(ee.K.isPriorityMode)
                  .view(
                    (0, ne.RN)(A.R.SpecialId.Priority, A.R.SpecialId.AllAlerts)
                  )
              : le.h.create(A.R.SpecialId.AllAlerts),
          ot = (0, j.VC)(Ne, je, nt, Oe),
          lt = le.h.create(true),
          ct = j.Py.getStateTransformer(
            j.Py.getDefaultBehavior(l.O.getActiveItemWithAlert, Oe),
            ot,
            e.alertsReader,
            Oe,
            (e) => lt.get() && "text" !== e.alertSource,
            a.Q1,
            nt
          ),
          dt = Y.v.Items.getItemsPositionsUpdateTransformer(Oe),
          ut = (0, a.ls)(ct, oe.L9(dt)),
          pt = new Q.l(
            Ue,
            Ne,
            e.alertsReader,
            e.alertsService,
            rt,
            l.O.getActiveItemWithAlert,
            ut
          ),
          mt = new ie.L(
            Ue,
            e.sessionModel,
            a.Q1,
            Oe,
            ae.none,
            ae.none,
            (e) =>
              X.nL.isWithPriorityList(e) &&
              Y.v.WithPriority.onlyNonPriorityAlertsLeft(
                e.currentLens,
                l.O.priorityTest,
                Oe
              ),
            Y.v.WithPriority.isInSuccess(l.O.priorityTest, Oe),
            le.h.create(false)
          ),
          ht = _e
            .pipe(
              V.w(
                ae.fold(
                  () => B.E,
                  (t) =>
                    t.initAssistantSession(
                      Ke.actionEvents,
                      e.alertsReader,
                      Ue,
                      e.alertsService,
                      e.alertsList.state
                    )
                )
              )
            )
            .subscribe(),
          gt = ke
            .pipe(
              V.w(
                ae.fold(
                  () => B.E,
                  (t) =>
                    t.initCardActionsProcessing(
                      Ke.actionEvents,
                      e.alertsReader,
                      (0, o.aU)(Ue),
                      (0, o.X5)(at, Ue),
                      Ue
                    )
                )
              )
            )
            .subscribe(),
          vt = Ke.actionEvents.subscribe(
            (0, a.ls)(
              (0, r.JH)(e.alertsReader, r.SV.Source.sidebar),
              se.bw((e) => Ae.next(e))
            )
          );
        return {
          lensState: Ue,
          lensStateManager: pt,
          cardsViewModel: Ke,
          marksViewModel: et,
          navigationViewModel: qe,
          successLensViewModel: mt,
          alignmentViewModel: it,
          lensPreviewViewModel: Re,
          cardsListScrollManager: tt,
          notificationManager: st,
          upgradeViewModel: We,
          modalManager: ze,
          capabilities: Oe,
          upgradeHookFlow: Ye,
          dispose: () => {
            vt.unsubscribe(),
              et.dispose(),
              He.unsubscribe(),
              xe.unsubscribe(),
              Ze.dispose(),
              ht.unsubscribe(),
              gt.unsubscribe(),
              $e.unsubscribe(),
              Ge.dispose();
          },
        };
      };
    },
    40081: (e, t, i) => {
      i.d(t, { t: () => f });
      var a = i(71249),
        s = i(57050),
        r = i(40327),
        n = i(45614),
        o = i(32426),
        l = i(80800),
        c = i(66896),
        d = i(48439),
        u = i(64992),
        p = i(8125),
        m = i(22232),
        h = i(5114),
        g = i(50147),
        v = i(38983);
      class f {
        constructor(e, t, i) {
          (this._lensesList = e),
            (this._alertsFilterService = t),
            (this._scoreStatus = i),
            (this.getLens = (0, p.HP)(function (e) {
              switch (e) {
                case c.R.SpecialId.AllAlerts:
                  return this._lensesList.view(
                    w(
                      c.R.Info.allAlerts,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(
                        c.R.SpecialId.AllAlerts
                      )
                    )
                  );
                case c.R.SpecialId.Priority:
                  return this._lensesList.view(
                    w(
                      c.R.Info.priority,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(
                        c.R.SpecialId.Priority
                      )
                    )
                  );
                case c.R.SpecialId.PredictionTakeaways:
                  return this._lensesList.view(
                    w(
                      c.R.Info.predictionTakeaways,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(
                        c.R.SpecialId.PredictionTakeaways
                      )
                    )
                  );
                case c.R.SpecialId.PredictionEmogenie:
                  return this._lensesList.view(
                    w(
                      c.R.Info.predictionEmogenie,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(
                        c.R.SpecialId.PredictionEmogenie
                      )
                    )
                  );
                case c.R.SpecialId.RealTimeProofit:
                  return this._lensesList.view(
                    w(
                      c.R.Info.realTimeProofit,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(
                        c.R.SpecialId.RealTimeProofit
                      )
                    )
                  );
                case c.R.SpecialId.Plagiarism:
                  return this._lensesList.view(this._getPlagiarismLens);
                case c.R.SpecialId.Premium:
                  return this._lensesList.view(
                    w(
                      c.R.Info.premium,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(
                        c.R.SpecialId.Premium
                      )
                    )
                  );
                case c.R.SpecialId.FreePremiumAlerts:
                  return this._lensesList.view(
                    w(
                      c.R.Info.freePremium,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(
                        c.R.SpecialId.FreePremiumAlerts
                      )
                    )
                  );
                case c.R.SpecialId.Correctness:
                case c.R.SpecialId.Clarity:
                case c.R.SpecialId.Engagement:
                case c.R.SpecialId.Delivery:
                case c.R.SpecialId.Vox:
                case c.R.SpecialId.CorrectnessPriority:
                case c.R.SpecialId.ClarityPriority:
                case c.R.SpecialId.EngagementPriority:
                case c.R.SpecialId.DeliveryPriority:
                case c.R.SpecialId.VoxPriority:
                  return this._lensesList.view(
                    w(
                      c.R.Info.createOutcome(e),
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(e)
                    )
                  );
                case c.R.SpecialId.RealTimeProofit:
                  return this._lensesList.view(
                    w(
                      c.R.Info.realTimeProofit,
                      c.R.Meta.group.empty,
                      this._alertsFilterService.getLensesFilter(e)
                    )
                  );
                default:
                  return (0, m.vE)(e);
              }
            })),
            (this._outcomes = [
              c.R.SpecialId.Correctness,
              c.R.SpecialId.Clarity,
              c.R.SpecialId.Engagement,
              c.R.SpecialId.Delivery,
            ]),
            (this._previews = (0, p.HP)(() =>
              n.uX((0, o.getFirstSemigroup)(), a.IX)(this._outcomes, (e) => [
                e,
                this._getPreview(e),
              ])
            )),
            (this._isDocumentEmpty = v.h.create(false)),
            (this._isFree = v.h.create(false)),
            (this._outcomeStatusMask = v.h.combine(
              this._isDocumentEmpty,
              this._isFree,
              (e, t) => {
                let i = 0;
                return (
                  e && (i |= u.x.IsDocumentEmpty), t && (i |= u.x.IsFreeUser), i
                );
              }
            )),
            (this._getPlagiarismLens = (0, s.ls)(
              w(
                c.R.Info.plagiarism,
                { ...c.R.Meta.group.empty, percentile: d.T.MAX },
                this._alertsFilterService.getLensesFilter(
                  c.R.SpecialId.Plagiarism
                )
              ),
              c.R.WithAlerts.modifyMeta((e) => ({
                ...e,
                percentile: d.T.groupSum.concat(
                  d.T.MAX,
                  d.T.groupSum.inverse(e.percentile)
                ),
              }))
            ));
        }
        findLens(e) {
          return (0, r.pipe)(
            h.fromNullable(
              [
                this.getLens(c.R.SpecialId.AllAlerts),
                this.getLens(c.R.SpecialId.Premium),
              ].find((t) => e(t.get()))
            ),
            h.map((e) => e.get().id)
          );
        }
        _getPreview(e) {
          return {
            ...c.R.Info.base,
            logo: h.none,
            ...this._getOutcomeButtonData(e),
          };
        }
        get lensPreviews() {
          return this._previews();
        }
        _getOutcomeButtonData(e) {
          const t = this.getLens(e),
            i = t.get().title,
            a = this._isFree.view(
              (t) =>
                t &&
                (e === c.R.SpecialId.Engagement || e === c.R.SpecialId.Delivery)
            ),
            n = v.h.combine(
              t.view("count").view((e) => 0 === e),
              a,
              (e, t) => e && !t
            ),
            { description: o, stateMessage: p } = (0, u.O)(e),
            m = v.h
              .combine(
                this._isDocumentEmpty,
                n,
                t.view("percentile"),
                (e, t, i) => (e ? d.T.MIN : t ? d.T.MAX : i)
              )
              .view(d.g.fromRatio),
            g = v.h.create(false),
            f = v.h.combine(
              this._scoreStatus.view((e) =>
                (0, r.pipe)(
                  e,
                  h.map((e) => e === l.v0.ScoresStatus.SENSITIVE),
                  h.getOrElse(s.jv)
                )
              ),
              t,
              m,
              this._outcomeStatusMask,
              g,
              p
            );
          return {
            id: e,
            title: i,
            description: o,
            status: f,
            progress: m,
            isUnavailable: a,
          };
        }
        get nonEmptyLensId() {
          return (0, r.pipe)(
            h.fromNullable(
              [
                this.getLens(c.R.SpecialId.AllAlerts),
                this.getLens(c.R.SpecialId.Premium),
              ].find((e) => e.get().count > 0)
            ),
            h.map((e) => e.get().id)
          );
        }
      }
      function w(e, t, i) {
        return (a) => {
          return new c.R.LensImpl(
            e,
            ((s = e.id),
            (n = t),
            (e) =>
              (0, r.pipe)(
                g.P5(c.R.Id.ord)(s, e),
                h.getOrElse(() => n)
              ))(a),
            i
          );
          var s, n;
        };
      }
    },
    62346: (e, t, i) => {
      i.d(t, { o$: () => z, xl: () => G });
      var a,
        s = i(57050),
        r = i(40327),
        n = i(33381),
        o = i(51972),
        l = i(95572),
        c = i(95384),
        d = i(5817),
        u = i(66896),
        p = i(40018),
        m = i(51374),
        h = i(4390),
        g = i(9922),
        v = i(98403),
        f = i(59368),
        w = i(16746),
        b = i(17594),
        S = i(35416),
        y = i(25975),
        _ = i(74364),
        k = i(24209),
        A = i(85985),
        C = i(28043),
        E = i(41398),
        I = i(77176),
        M = i(76974),
        T = i(32952),
        x = i(16118),
        R = i(40151),
        L = i(60797),
        F = i(24713),
        P = i(8125),
        V = i(5114),
        B = i(92843),
        O = i(95195),
        N = i(83078),
        D = i(71249),
        U = i(55415),
        H = i(22232),
        j = i(38983),
        W = i(81531);
      !(function (e) {
        (e.create = (e, t, i, a, s, r) => (n, o) => {
          const l = o.to.visualState === f.Bd.highlighted;
          return c.sO.Change.getCreateAction({
            range: n,
            capiAlertId: e,
            visualState: l
              ? { type: c.sO.Change.VisualState.Type.highlighted, source: t() }
              : { type: c.sO.Change.VisualState.Type.visible },
            highlightColor: i,
            highlightDisplayFormat: a(n(), l),
            highlightDisappearOnHoverDelay: s,
            order: r,
          });
        }),
          (e.update = (e, t, i, a, s, r) => (n, o) => {
            const l = o.to.visualState === f.Bd.highlighted;
            return c.sO.Change.getUpdateAction({
              range: n,
              capiAlertId: e,
              visualState: l
                ? {
                    type: c.sO.Change.VisualState.Type.highlighted,
                    source: t(),
                  }
                : { type: c.sO.Change.VisualState.Type.visible },
              highlightColor: i,
              highlightDisplayFormat: a(n(), l),
              highlightDisappearOnHoverDelay: s,
              order: r,
            });
          }),
          (e.remove = (e) => (t) =>
            c.sO.Change.getRemoveAction({ range: t, capiAlertId: e }));
      })(a || (a = {}));
      const G = (e, t, i, a = j.h.create(false)) =>
        k
          .T(
            e.pipe(
              A.h((e) => e.currentLens.id !== u.R.SpecialId.Premium),
              C.x(
                (e, t) =>
                  !(
                    e.currentLens.id !== t.currentLens.id ||
                    (S.nL.isWithPriorityList(e) &&
                      S.nL.isWithPriorityList(t) &&
                      y.v.WithPriority.isNonPriorityListOpened(
                        e.currentLens
                      ) !==
                        y.v.WithPriority.isNonPriorityListOpened(t.currentLens))
                  )
              ),
              C.x()
            ),
            i.pipe(
              E.M(e),
              I.U(([e, t]) => t)
            )
          )
          .pipe(
            E.M(a),
            I.U(([e, i]) =>
              i
                ? (0, P.W9)(p.bZ.isPremium, p.bZ.isHidden)
                : t.alertVisibleInText(
                    e.currentLens.id,
                    y.v.WithPriority.nonPriorityAlertsVisible(e)
                  )
            )
          );
      class z {
        constructor(
          e,
          t,
          i,
          d,
          v,
          y,
          k,
          C,
          E = M.of(void 0),
          L = false,
          F = j.h.create(false)
        ) {
          (this._alertList = e),
            (this._alertsReader = t),
            (this._positionManager = i),
            (this._alertsService = d),
            (this._ded = v),
            (this._lensState = y),
            (this._filterChanges = k),
            (this._getActiveItemWithAlert = C),
            (this._readyObs = E),
            (this._emulateAppliedAlertAnimation = L),
            (this._showYellowUnderlines = F),
            (this._highlightedAlert = V.none),
            (this._focusedAlert = V.none),
            (this._marksMap = new Map()),
            (this._subs = new g.w.Keeper()),
            (this.events = new T.xQ()),
            (this._alertStateDiff = this._alertList.state.pipe(
              x.G(),
              I.U(([e, t]) => h.p.diff(e, t)),
              A.h((0, P.ff)(B.v.isEmpty))
            )),
            (this._alertsFilter = j.h.create(s.jv)),
            (this._filteredAlerts = j.h.create(V.none)),
            (this._ready = false),
            (this._log = W.C8.Logging.getLogger("marks_view_model")),
            (this.getMarkByAlert = (e) =>
              (0, r.pipe)(
                this._marksMap.get(e.alert.id),
                V.fromNullable,
                V.chain((t) => t.markByIndex(e.highlightIndex))
              )),
            (this.getAlertByMark = (e) =>
              (0, r.pipe)(
                this._alertsReader.getRegistered(
                  m.P.fromRangeIdToAlertId(e.id)
                ),
                V.chain((t) =>
                  (0, r.pipe)(
                    _.$A.getHighlightIndex(t, e.range()),
                    O.UI((e) => ({
                      alert: b.$.fromModel(t),
                      highlightIndex: e,
                    })),
                    V.fromEither
                  )
                )
              )),
            (this.ensureAlertHighlightInViewport = (e, t, i) =>
              (0, r.pipe)(
                this.getMarkByAlert(e),
                V.fold(
                  () => R.E,
                  (e) =>
                    this._ded.scrollToMark(e.id, { animate: i, paddingTop: t })
                )
              )),
            (this._createMA = (e, t) => {
              const i = t && p.bZ.isPremium(e) && p.bZ.isHidden(e),
                d = N.MH(e.rawId),
                {
                  impact: h,
                  cardLayout: { outcome: g },
                  extra_properties: v,
                } = e.toRawAlert(),
                y = n.M.getHighlightColor(l.DD.createOutcomeType(g), h, v, i),
                k = this._lensState
                  .view(S.nL.getActiveItem(o.O.getActiveItemWithAlert))
                  .view(
                    (0, s.ls)(
                      V.filter((t) => t.activeAlert.id === e.id),
                      V.map((e) => e.activeHighlightIndex),
                      V.getOrElse(() => 0)
                    )
                  ),
                A = (e) => (t, i) => {
                  const a = m.x.isEnclosingView(t),
                    s = e.getHighlightRanges().some(m.x.isEnclosingView),
                    o = m.x.isMainView(t),
                    l = m.x.isMainStartView(t),
                    c = e.getHighlightRanges(),
                    d =
                      (0, r.pipe)(
                        c,
                        D.cx((e) => e.start === t.start && e.end === t.end),
                        V.getOrElse(() => 0)
                      ) === k.get(),
                    u = p.bZ.isSuperAlert(e);
                  return n.M.getHighlightDisplayFormat({
                    isEnclosing: a,
                    isEnclosed: s,
                    isMain: o,
                    isMainStart: l,
                    isActive: d,
                    belongsToActiveAlert: i,
                    belongsToSuperAlert: u,
                  });
                },
                C = u.R.getSortOrder(e.lensType),
                E = new w.v(
                  (t) =>
                    (0, r.pipe)(
                      this._alertsReader.getById(e.id),
                      V.alt(
                        () => (
                          t &&
                            this._log.warn(
                              "Could not find alert for provided MarkAlert",
                              { alert: e, source: t }
                            ),
                          V.some(e)
                        )
                      ),
                      V.map(b.$.fromModel),
                      N.MH
                    ),
                  this._alertsService,
                  this._alertsService,
                  (e) => this._ded.changeMarks(e),
                  a.create(
                    d,
                    () => c.sO.Change.VisualState.Source.api,
                    y,
                    A(e),
                    null,
                    C
                  ),
                  a.update(
                    d,
                    () =>
                      q.getAlertSource(
                        e,
                        this._lensState.get(),
                        this._getActiveItemWithAlert
                      ),
                    y,
                    A(e),
                    null,
                    C
                  ),
                  a.remove(d),
                  (t) => {
                    t.to.visualState === f.Bd.applied &&
                      (this.events.next({
                        type: _.ay.Type.AppliedAlertAnimationFinished,
                        alert: e,
                      }),
                      this._handleRemovedAlerts([e]).forEach((e) => e.apply()));
                  }
                );
              return this._marksMap.set(e.id, E), E;
            }),
            (this._handleRemovedAlerts = (e) =>
              e.map(({ id: e }) => {
                const t = this._marksMap.get(e);
                return (
                  this._marksMap.delete(e), t.scheduleApply(f.Bd.disposed), t
                );
              })),
            (this._handleAlertUpdate = (e, t) =>
              e
                .map((e) =>
                  p.bZ.isRegistered(e) && !p.bZ.isMuted(e)
                    ? (0, r.pipe)(
                        V.fromNullable(this._marksMap.get(e.id)),
                        V.fold(
                          () =>
                            this._alertsFilter.get()(e)
                              ? this._createMA(e, t)
                              : null,
                          (e) => (
                            e.scheduleUpdate(),
                            f.Oe.isOrWillBe(f.Bd.success)(e) &&
                              e.scheduleApply(f.Bd.highlighted),
                            e
                          )
                        )
                      )
                    : (0, r.pipe)(
                        V.fromNullable(this._marksMap.get(e.id)),
                        V.fold(
                          () => {},
                          (t) => (
                            e.allowUpdate &&
                            p.bZ.isCapiDone(e) &&
                            p.bZ.isRated(e) &&
                            f.Oe.isOrWillBe(f.Bd.highlighted)(t)
                              ? (t.scheduleUpdate(),
                                t.scheduleApply(f.Bd.success))
                              : (t.scheduleApply(f.Bd.disposed),
                                this._marksMap.delete(t.alert.id)),
                            t
                          )
                        )
                      )
                )
                .filter((e) => Boolean(e))),
            this._subs.push(
              this._readyObs.subscribe(() => {
                this._subs.push(
                  this._listenAlertsUpdates(),
                  this._listenRangesUpdates(),
                  this._listenFilterChange(),
                  this._listenFilteredAlerts()
                ),
                  (this._ready = true);
              })
            );
        }
        focusAlertHighlight(e) {
          return this._ready
            ? (0, r.pipe)(
                this._marksMap.get(e.alert.id),
                V.fromNullable,
                V.map((t) => {
                  (this._focusedAlert = V.some(e.alert.id)),
                    t.scheduleApply(f.Bd.highlighted),
                    t.scheduleForceUpdate(),
                    t.apply();
                }),
                O.Yo(() => new Error("Unknown alert")),
                O.UI(() => ({
                  dispose: () => {
                    V.exists((t) => t === e.alert.id)(this._focusedAlert) &&
                      (this._highlightedAlert = V.none),
                      (0, r.pipe)(
                        this._marksMap.get(e.alert.id),
                        V.fromNullable,
                        V.filter(
                          () =>
                            !(0, r.pipe)(
                              this._highlightedAlert,
                              V.exists((t) => t === e.alert.id)
                            )
                        ),
                        V.map((e) => {
                          e.scheduleApply(f.Bd.visible), e.apply();
                        })
                      );
                  },
                }))
              )
            : O.t$(new Error("marks view model is not ready yet"));
        }
        highlightAlertHighlight(e) {
          return this._ready
            ? (0, r.pipe)(
                this._marksMap.get(e.id),
                V.fromNullable,
                V.map((t) => {
                  (this._highlightedAlert = V.some(e.id)),
                    t.scheduleApply(f.Bd.highlighted),
                    t.apply();
                }),
                O.Yo(() => new Error("Unknown alert")),
                O.UI(() => ({
                  dispose: () => {
                    V.exists((t) => t === e.id)(this._highlightedAlert) &&
                      (this._highlightedAlert = V.none),
                      (0, r.pipe)(
                        this._marksMap.get(e.id),
                        V.fromNullable,
                        V.filter(
                          () =>
                            !(0, r.pipe)(
                              this._focusedAlert,
                              V.exists((t) => t === e.id)
                            )
                        ),
                        V.map((e) => {
                          e.scheduleApply(f.Bd.visible), e.apply();
                        })
                      );
                  },
                }))
              )
            : O.t$(new Error("marks view model is not ready yet"));
        }
        moveCursorToHighlight(e, t) {
          return this._ready
            ? (0, r.pipe)(
                this._marksMap.get(e.alert.id),
                V.fromNullable,
                V.chain((t) => t.markByIndex(e.highlightIndex)),
                V.chain((e) => V.fromEither(e.range())),
                V.fold(
                  () => O.t$(new Error("Cannot find mark for given range")),
                  (e) => {
                    const { index: i, length: a } = this._ded.getCursor();
                    if (0 === a && (i < e.start || i > e.end)) {
                      const i = Math.min(
                        e[t],
                        this._ded.getLastPossibleCursorPosition()
                      );
                      return (0, r.pipe)(this._ded.setCursor(i, 0), O.vx(O.t$));
                    }
                    return O.F2(void 0);
                  }
                )
              )
            : O.t$(new Error("marks view model is not ready yet"));
        }
        dispose() {
          this._subs.dispose();
        }
        _listenAlertsUpdates() {
          const e = (e) => ({
            activeAlerts: [],
            updatedAlerts: [],
            removedAlerts: [],
            acceptedAlerts: [],
            hiddenMarkAlerts: [],
            ...e,
          });
          return k
            .T(
              this._filteredAlerts.pipe(
                L.cp(({ visible: t, hidden: i }) =>
                  M.of(e({ activeAlerts: U.qo(t), removedAlerts: U.qo(i) }))
                )
              ),
              this._alertStateDiff.pipe(
                E.M(this._alertsFilter),
                I.U(([t, i]) =>
                  (0, r.pipe)(
                    t,
                    B.v.reduce(
                      e({}),
                      (e, t) => (
                        this._marksMap.has(t.alert.id) &&
                          e.removedAlerts.push(t.alert),
                        e
                      ),
                      (e, t, i) => (
                        p.bZ.isAccepted(i.alert)
                          ? e.acceptedAlerts.push(i.alert)
                          : e.updatedAlerts.push(i.alert),
                        e
                      ),
                      (e, t) => (i(t.alert) && e.activeAlerts.push(t.alert), e)
                    )
                  )
                )
              )
            )
            .pipe(
              E.M(this._showYellowUnderlines),
              I.U(
                ([
                  {
                    activeAlerts: e,
                    removedAlerts: t,
                    updatedAlerts: i,
                    acceptedAlerts: a,
                  },
                  s,
                ]) => {
                  let r = [];
                  return (
                    (r = r.concat(
                      e
                        .filter(
                          (0, P.W9)(
                            (0, P.Kg)(
                              (e) => s && p.bZ.isPremium(e) && p.bZ.isHidden(e),
                              (0, P.ff)(p.bZ.isPremium)
                            ),
                            (e) => V.isSome(e.rawId)
                          )
                        )
                        .map((e) => {
                          const t = this._marksMap.get(e.id);
                          return void 0 !== t
                            ? (t.scheduleForceUpdate(), t)
                            : this._createMA(e, s);
                        })
                    )),
                    this._emulateAppliedAlertAnimation &&
                      setTimeout(() => {
                        a.forEach((e) => {
                          this.events.next({
                            type: _.ay.Type.AppliedAlertAnimationFinished,
                            alert: e,
                          });
                        });
                      }, 3 * (0, d.Xd)(20)),
                    (r = r.concat(
                      this._handleRemovedAlerts(
                        t.concat(a).filter((e) => this._marksMap.has(e.id))
                      )
                    )),
                    (r = r.concat(this._handleAlertUpdate(i, s))),
                    r
                  );
                }
              )
            )
            .subscribe((e) => {
              if (e.length > 0) {
                const [t, ...i] = e;
                t.applyWith(i);
              }
            });
        }
        _listenRangesUpdates() {
          return this._positionManager.rangeChanged
            .pipe(
              F.j("changed"),
              I.U((e) =>
                e.filter(
                  (e) =>
                    m.P.is(e) &&
                    m.x.isVisible(e) &&
                    this._marksMap.has(e.meta.alertId)
                )
              ),
              A.h((e) => e.length > 0)
            )
            .subscribe((e) => {
              const t = Array.from(e.values()).reduce(
                  (e, t) =>
                    (0, r.pipe)(
                      this._alertsReader.getById(t.meta.alertId),
                      V.chain((e) => this._alertsReader.getRegistered(e.id)),
                      V.chain((e) => V.fromNullable(this._marksMap.get(e.id))),
                      N.bw((t) => e.set(t.alert.id, t)),
                      (0, s.a9)(e)
                    ),
                  new Map()
                ),
                i = Array.from(t.values());
              if (
                (i.forEach((e) => {
                  e.scheduleForceUpdate();
                }),
                i.length > 0)
              ) {
                const [e, ...t] = i;
                e.applyWith(t);
              }
            });
        }
        _listenFilterChange() {
          return this._filterChanges.subscribe((e) => {
            v.wW(this._alertsFilter)(e);
          });
        }
        _listenFilteredAlerts() {
          return this._alertsFilter
            .pipe(
              E.M(this._alertList.state),
              I.U(([e, t]) =>
                (0, r.pipe)(
                  t,
                  h.p.reduce(
                    { visible: {}, hidden: {} },
                    (t, i) => (
                      e(i.alert) && p.bZ.isRegistered(i.alert)
                        ? (t.visible[i.alert.id] = i.alert)
                        : (t.hidden[i.alert.id] = i.alert),
                      t
                    )
                  ),
                  (e) => V.some(e)
                )
              )
            )
            .subscribe(v.wW(this._filteredAlerts));
        }
      }
      var q;
      !(function (e) {
        (e.toSidebarFluidMarkSource = (e) => {
          switch (e) {
            case p.l$.text:
            case S.h8.forceText:
              return c.sO.Change.VisualState.Source.text;
            case p.l$.sidebar:
            case S.h8.forceSidebar:
              return c.sO.Change.VisualState.Source.sidebar;
            case p.l$.api:
              return c.sO.Change.VisualState.Source.api;
            default:
              return (0, H.vE)(e);
          }
        }),
          (e.getAlertSource = (t, i, a) =>
            S.nL.hasCards(i)
              ? (0, r.pipe)(
                  a(i.currentLens),
                  V.fold(
                    () => c.sO.Change.VisualState.Source.api,
                    (a) =>
                      a.activeAlert.id === t.id
                        ? e.toSidebarFluidMarkSource(i.alertSource)
                        : c.sO.Change.VisualState.Source.api
                  )
                )
              : c.sO.Change.VisualState.Source.api);
      })(q || (q = {}));
    },
    780: (e, t, i) => {
      i.d(t, { o: () => L });
      var a = i(40327),
        s = i(73582),
        r = i(73353),
        n = i(98782),
        o = i(83078),
        l = i(55415),
        c = i(8125),
        d = i(5114);
      function u({
        documentModel: e,
        features: t,
        gnar: i,
        modalOperations: u,
        upgradeVM: p,
        source: m,
      }) {
        return (0, n.k)(
          e,
          (function (e, t, i) {
            return {
              goalsPopupShow: (t) => e.goalsPopupShow(t),
              getPremiumButtonClick: () =>
                e.getPremiumButtonClick("goPremium", "setGoalsPopup"),
              goalsFormSuccess: (s, r) => {
                const n = () => o.FX("academic")(s.domain) && t;
                return e.goalsFormSuccess(
                  (0, a.pipe)(
                    s.domain,
                    d.getOrElse(() => r.domain)
                  ),
                  (0, a.pipe)(
                    s.goals,
                    d.map((e) => (n() ? [] : e)),
                    d.getOrElse(() => r.goals),
                    (e) => Array.from(e)
                  ),
                  i,
                  (0, a.pipe)(
                    s.outcomeContext,
                    d.filter(n),
                    d.map(l.ei("type")),
                    d.toUndefined
                  ),
                  (0, a.pipe)(
                    s.audience,
                    d.filter((0, c.ff)(n)),
                    d.toUndefined
                  ),
                  (0, a.pipe)(
                    s.outcomeContext,
                    d.filter(n),
                    d.map(l.ei("citation")),
                    d.toUndefined
                  ),
                  (0, a.pipe)(s.style, d.filter((0, c.ff)(n)), d.toUndefined)
                );
              },
            };
          })(i, t.isStudentsOFE, m),
          u,
          m,
          r.R$.defaultContextFallback,
          t,
          () => p.openUpgradeUrl(s.L.Place.gdocsGoals),
          false
        );
      }
      var p = i(98403),
        m = i(18625),
        h = i(57091),
        g = i(66310),
        v = i(76974),
        f = i(13444),
        w = i(93508),
        b = i(48403),
        S = i(95343),
        y = i(25970),
        _ = i(95195),
        k = i(38983),
        A = i(81531);
      class C {
        constructor(e, t) {
          (this._documentModel = e),
            (this._modalOperations = t),
            (this.reportViewModel = d.none),
            (this.state = m
              .P(() => p.GQ(() => this._documentModel.calculateStats()))
              .pipe(
                h.a(this._documentModel.checkingState, (e, t) =>
                  (0, a.pipe)(
                    e,
                    d.filter(() => "idle" === t)
                  )
                ),
                g.w(
                  d.fold(
                    () => v.of({ type: y.g.State.Type.LOADING }).pipe(f.g(150)),
                    _.g_(
                      (e) => (
                        A.C8.Logging.getLogger("editor.toolbar").error(
                          "Error on requesting document stats",
                          e
                        ),
                        this.onModalClose(),
                        v.of({ type: y.g.State.Type.ERROR })
                      ),
                      (e) =>
                        k.h.combine(
                          this._documentModel.score,
                          this._documentModel.counters,
                          this._documentModel.documentLength.view("trimmed"),
                          (t, i, s) =>
                            (0, a.pipe)(
                              t,
                              d.fold(
                                () => ({ type: y.g.State.Type.SHORT_CONTENT }),
                                (t) => ({
                                  type: y.g.State.Type.READY,
                                  documentIsEmpty: 0 === s,
                                  score: t,
                                  counters: i,
                                  stats: e,
                                })
                              )
                            )
                        )
                    )
                  )
                ),
                w.O({ type: y.g.State.Type.EMPTY }),
                b._(1),
                S.x()
              )),
            (this.onModalClose = () => {
              this._modalOperations.onClose();
            });
        }
      }
      var E = i(81301),
        I = i(22621),
        M = i(9690),
        T = i(77176),
        x = i(22232),
        R = i(31881);
      class L {
        constructor(e, t, i, a, s = false) {
          (this._documentModel = e),
            (this._upgradeViewModel = t),
            (this._isPremiumUser = i),
            (this._gnar = a),
            (this._isStudentsOFE = s);
        }
        load(e) {
          switch (e.type) {
            case E.dC.SetGoals:
              return this._loadSetGoals(e.source);
            case E.dC.Performance:
              return this._loadPerformance();
            default:
              return (0, x.vE)(e);
          }
        }
        _loadSetGoals(e) {
          return Promise.resolve((t) => {
            const i = u({
              features: {
                demoMode: false,
                isRedesign: false,
                isFree: !this._isPremiumUser,
                isStudentsOFE: this._isStudentsOFE,
              },
              documentModel: this._documentModel,
              upgradeVM: this._upgradeViewModel,
              source: e,
              modalOperations: t,
              gnar: this._gnar,
            });
            return {
              instance: { type: E.dC.SetGoals, source: e },
              component: R.UI.mount(I.R.Modal, i),
            };
          });
        }
        _loadPerformance() {
          return Promise.resolve((e) => {
            const t = new C(this._documentModel, e),
              i = R.UI.Knot.make(M.q.ModalView, {
                downloadButton: R.UI.Node.empty,
              }),
              a = R.Z.fromSideEffect((t) => {
                if (t.action.kind === M.q.ActionsKind.close) e.onClose();
                else (0, x.vE)(t.action.kind);
              }, t.state.pipe(T.U((e) => ({ root: e }))));
            return {
              instance: { type: E.dC.Performance },
              component: R.UI.mount(i, a),
            };
          });
        }
      }
    },
    37290: (e, t, i) => {
      if ((i.d(t, { $: () => y }), 3075 == i.j)) var a = i(57050);
      if (3075 == i.j) var s = i(77394);
      if (3075 == i.j) var r = i(81301);
      if (3075 == i.j) var n = i(40018);
      if (3075 == i.j) var o = i(66896);
      if (3075 == i.j) var l = i(32952);
      if (3075 == i.j) var c = i(9922);
      if (3075 == i.j) var d = i(41398);
      if (3075 == i.j) var u = i(77176);
      if (3075 == i.j) var p = i(85985);
      if (3075 == i.j) var m = i(66310);
      if (3075 == i.j) var h = i(40151);
      if (3075 == i.j) var g = i(4890);
      if (3075 == i.j) var v = i(35416);
      if (3075 == i.j) var f = i(43637);
      if (3075 == i.j) var w = i(5114);
      if (3075 == i.j) var b = i(22232);
      if (3075 == i.j) var S = i(38983);
      class y {
        constructor(e, t, i, s, r, m, h, b) {
          (this._state = e),
            (this._lensPreviewVM = t),
            (this._sidebarEvents = i),
            (this._modalManager = s),
            (this._ded = r),
            (this._features = m),
            (this._gnar = h),
            (this._defaultLensMode = b),
            (this.isUphooksRedesign = false),
            (this.popover = S.h.create(w.none)),
            (this.events = new l.xQ()),
            (this.activeLensId = this._state.view("currentLens", "id")),
            (this.documentActions = S.h.create({
              proofit: f.Bo.proofitDisabled(f.TV.NotAvailable),
              plagiarism: f.Bo.plagiarismDisabled(f.eh.NotAvailable),
            })),
            (this.showMuteControl = S.h.create(false)),
            (this._subs = new c.w.Keeper()),
            (this._lensSwitch = new l.xQ()),
            (this.lensMode = S.h.create(this._defaultLensMode)),
            (this.lensTitleType =
              "none" !== this._features.priorityLens.kind
                ? f.Bo.LensTitleType.priority
                : f.Bo.LensTitleType.default),
            (this.lensChangeEffect = {
              id: "lensChangeEffect",
              when: a.W8,
              what: v.nL.Effect.SwitchLens.create(
                this._lensSwitch.pipe(
                  d.M(this._state.pipe(u.U((e) => e.currentLens.id))),
                  p.h(([{ lensId: e }, t]) => e !== t),
                  u.U(([{ lensId: e, focusFirst: t }]) => ({
                    lensId: e,
                    alertSource: n.l$.sidebar,
                    options: {
                      order: "lensOrder",
                      toFocus: t
                        ? v.nL.Effect.FocusBehavior.focusFirst
                        : v.nL.Effect.FocusBehavior.noFocus,
                    },
                  }))
                )
              ),
            }),
            (this.cardVisualMode = S.h.create(
              g.j.CardVisualMode.RegularLightMode
            )),
            this._listenNavigationEvent();
          const y = [
            o.R.SpecialId.Correctness,
            o.R.SpecialId.Clarity,
            o.R.SpecialId.Engagement,
            o.R.SpecialId.Delivery,
          ].reduce(
            (e, t) => ((e[t] = this._lensPreviewVM.lensPreviews[t]), e),
            {}
          );
          (this.lensPreviews = S.h.create(y)), (this.a11yContrast = false);
        }
        dispose() {
          this._subs.dispose();
        }
        _listenNavigationEvent() {
          this._subs.push(
            this.events
              .pipe(
                m.w((e) => {
                  switch (e.type) {
                    case "toggleSidebar":
                      return this._sidebarEvents.next({ kind: s.R.Close }), h.E;
                    case "switchToLens":
                      if ("none" !== this._features.priorityLens.kind) {
                        const t =
                          e.id === o.R.SpecialId.Priority ? "priority" : "all";
                        this._sidebarEvents.next({
                          kind: s.R.ChangeLens,
                          selectedLens: t,
                        }),
                          this._lensSwitch.next({
                            lensId: e.id,
                            focusFirst: e.focusFirst,
                          }),
                          this._gnar.gdocsSidebarChangeLensButtonClick(
                            t,
                            this._lensPreviewVM
                              .getLens(o.R.SpecialId.AllAlerts)
                              .get().count,
                            this._ded.getTextLength(),
                            this._lensPreviewVM
                              .getLens(o.R.SpecialId.Priority)
                              .get().count,
                            "dropdown" === this._features.priorityLens.kind
                              ? "dropdown"
                              : "priorityToggle"
                          );
                      } else this._gnar.gdocsSidebarOpenLensButtonClick(e.id);
                      return h.E;
                    case "setGoals":
                      return this._modalManager.show(r.Iy.setGoals("user"));
                    case "performance":
                      return this._modalManager.show(r.Iy.performance);
                    case "switchToCritical":
                    case "switchToAdvanced":
                    case "preferences":
                    case "switchToAll":
                      return h.E;
                    default:
                      return (0, b.vE)(e);
                  }
                })
              )
              .subscribe()
          );
        }
      }
    },
    73582: (e, t, i) => {
      i.d(t, { L: () => a, x: () => S });
      var a,
        s = i(40327),
        r = i(65421),
        n = i(39354),
        o = i(66896),
        l = i(40018),
        c = i(6782),
        d = i(4390),
        u = i(2844),
        p = i(77176),
        m = i(98403),
        h = i(5114),
        g = i(8125),
        v = i(95574),
        f = i(95195),
        w = i(38983),
        b = i(81531);
      !(function (e) {
        let t;
        !(function (e) {
          (e.gdocsSidebarCardList = "gdocsSidebarCardList"),
            (e.gdocsSidebarSuccessView = "gdocsSidebarSuccessView"),
            (e.gdocsGoals = "gdocsGoals"),
            (e.gdocsSidebarAnonymousCard = "gdocsSidebarAnonymousCard"),
            (e.assistantCardList = "assistantCardList"),
            (e.extensionSettingsAssistant = "extensionSettingsAssistant"),
            (e.toneSuggestion = "toneSuggestion");
        })((t = e.Place || (e.Place = {})));
      })(a || (a = {}));
      class S {
        constructor(e, t, i) {
          (this._alertsList = e),
            (this._lensState = t),
            (this._maxAlertCategories = i),
            (this._log = b.C8.Logging.getLogger("UpgradeViewModel")),
            (this._advancedAlerts = w.h.create([])),
            (this.advancedAlerts = this._advancedAlerts.view((e) =>
              e.length > 0
                ? h.some({
                    count: e.length,
                    alerts: () =>
                      this._formatLiteAlerts(S._getGroupedLiteAlerts(e)),
                  })
                : h.none
            )),
            (this._formatLiteAlerts = (e) => {
              const t = e.slice(0, this._maxAlertCategories),
                i = e
                  .slice(this._maxAlertCategories)
                  .map((e) => e.count)
                  .reduce(g.Sm, 0);
              return i > 0
                ? [
                    ...t,
                    {
                      group: "",
                      category: "",
                      categoryHuman: "more...",
                      count: i,
                      lensName: "",
                      bundleInfo: h.none,
                    },
                  ]
                : t;
            }),
            u
              .aj([
                this._lensState
                  .view("currentLens")
                  .view("id")
                  .view(o.R.isPriority)
                  .view((e) =>
                    e
                      ? (e) =>
                          l.bZ.isRegistered(e) &&
                          l.bZ.isPremium(e) &&
                          l.bZ.isPriority(e)
                      : (e) => l.bZ.isRegistered(e) && l.bZ.isPremium(e)
                  ),
                this._alertsList.state,
              ])
              .pipe(
                p.U(([e, t]) =>
                  d.p.reduce([], (t, { alert: i }) => (e(i) && t.push(i), t))(t)
                )
              )
              .subscribe(m.wW(this._advancedAlerts));
        }
        openUpgradeUrl(e) {
          (0, s.pipe)(
            v.vM(() => {
              (0, n.P4)().openSubscriptionDialog({
                currentAlerts: this._getCapiAlerts(),
                isAnonymousUser: false,
                isFromEmail: false,
                forceUtmCampaign: e,
              });
            }),
            f.fS((e) =>
              this._log.fatal("unexpected error on open upgrade page", e)
            )
          );
        }
        _getCapiAlerts() {
          return this._advancedAlerts
            .get()
            .map((e) =>
              (0, r.IM)(S._toRawAlertWithPossibleWrongId(e), "sidebar")
            );
        }
        static _getGroupedLiteAlerts(e) {
          return c.Q.group(e.map((e) => e.toLiteAlert()));
        }
        static _toRawAlertWithPossibleWrongId(e) {
          return {
            ...e.toRawAlert(),
            id: (0, s.pipe)(
              e.rawId,
              h.getOrElse(() => e.id)
            ),
          };
        }
      }
    },
    33953: (e, t, i) => {
      if ((i.d(t, { r: () => p }), 3075 == i.j)) var a = i(6782);
      if (3075 == i.j) var s = i(40018);
      if (3075 == i.j) var r = i(4390);
      if (3075 == i.j) var n = i(14601);
      if (3075 == i.j) var o = i(2844);
      if (3075 == i.j) var l = i(77176);
      if (3075 == i.j) var c = i(28043);
      if (3075 == i.j) var d = i(5114);
      if (3075 == i.j) var u = i(38983);
      class p {
        constructor(e, t) {
          (this._alertsList = e),
            (this._lensState = t),
            (this._sub = new n.w()),
            (this._freeAlerts = u.h.create([])),
            (this.freeAlerts = this._freeAlerts.view((e) =>
              e.length > 0
                ? d.some({
                    count: e.length,
                    alerts: () =>
                      (function (e) {
                        return a.Q.group(e.map((e) => e.toLiteAlert()));
                      })(e),
                  })
                : d.none
            )),
            this._sub.add(
              o
                .aj([
                  this._lensState
                    .view("currentLens")
                    .view("id")
                    .view(
                      () => (e) =>
                        s.bZ.isRegistered(e) &&
                        !s.bZ.isHidden(e) &&
                        !s.bZ.isPremium(e)
                    ),
                  this._alertsList.state,
                ])
                .pipe(
                  l.U(([e, t]) =>
                    r.p.reduce(
                      [],
                      (t, { alert: i }) => (e(i) && t.push(i), t)
                    )(t)
                  ),
                  c.x()
                )
                .subscribe((e) => {
                  this._freeAlerts.set(e);
                })
            );
        }
        dispose() {
          this._sub.unsubscribe();
        }
      }
    },
    86705: (e, t, i) => {
      i.d(t, { v: () => r });
      var a = i(27378),
        s = i(80895);
      const r = ({ browser: e, className: t, title: i = "BETA" }) =>
        "safari" !== e
          ? a.createElement(s.C, { title: i, className: t })
          : null;
    },
    31944: (e, t, i) => {
      i.d(t, { J: () => o });
      var a = i(57050),
        s = i(27378),
        r = i(12187),
        n = i(22536);
      const o = ({
        onChange: e,
        labelId: t,
        className: i,
        checkboxClassName: o,
        labelClassName: l,
        checked: c,
        children: d,
        disabled: u,
        dataGrammarlyPart: p = "ui-kit-checkbox",
        tabIndex: m = 0,
      }) => {
        const [h, g] = s.useState(null != c && c);
        s.useEffect(() => {
          g(Boolean(c));
        }, [c]);
        const v = (t) => {
          t.preventDefault(), t.stopPropagation(), g(!h), null == e || e(!h);
        };
        return s.createElement(
          "div",
          { "data-grammarly-part": p, ...(0, r.Sh)(n.checkboxContainer, i) },
          s.createElement(
            "div",
            {
              ...(0, r.Sh)(n.checkbox, o, h ? n.checkboxChecked : null),
              role: "checkbox",
              "aria-checked": h,
              tabIndex: m,
              "aria-labelledby": t,
              onKeyDown: (e) => {
                " " === e.key && v(e);
              },
              onClick: u ? a.Q1 : v,
            },
            h
              ? s.createElement("div", { className: n.checkboxCheckmark })
              : null
          ),
          s.createElement("label", { id: t, onClick: v, className: l }, d)
        );
      };
    },
    84488: (e, t, i) => {
      i.d(t, { G: () => r });
      var a = i(27378),
        s = i(31542);
      const r = ({
        children: e,
        style: t,
        dataGrammarlyPart: i = "ui-kit-iframe",
        ...r
      }) => {
        const [n, o] = a.useState(null),
          l = a.useCallback((e) => {
            var t, i;
            let a = null;
            "contentDocument" in e.target &&
              (a =
                null !==
                  (i =
                    null === (t = e.target.contentDocument) || void 0 === t
                      ? void 0
                      : t.body) && void 0 !== i
                  ? i
                  : null),
              o(a),
              a && ((a.style.margin = "0"), (a.style.height = "100vh"));
          }, []);
        return a.createElement(
          "iframe",
          {
            ...r,
            style: { border: "none", ...t },
            onLoad: l,
            srcDoc: "<html><body></body></html>",
            "data-grammarly-part": i,
          },
          n && (0, s.createPortal)(e, n)
        );
      };
    },
    47422: (e, t, i) => {
      i.d(t, { z: () => l });
      var a = i(27378),
        s = i(84488),
        r = i(68370),
        n = i(51897),
        o = i.n(n);
      const l = ({
        placeholder: e,
        onChange: t,
        ariaLabel: i,
        className: n,
      }) => {
        const [l, c] = a.useState("");
        return (
          a.useEffect(() => {
            t(l);
          }, [l]),
          a.createElement(
            s.G,
            {
              dataGrammarlyPart: "ui-kit-textbox",
              className: n,
              style: { width: "100%", height: "100%" },
            },
            a.createElement(r.b, null, o().__css),
            a.createElement("div", {
              role: "textbox",
              className: o().textBox,
              contentEditable: true,
              onInput: (e) => c(e.target.innerText),
              "data-placeholder": e,
              "aria-placeholder": e,
              "aria-label": i,
            })
          )
        );
      };
    },
    81108: (e, t, i) => {
      i.d(t, { Q: () => o });
      var a = i(27378),
        s = i(90361),
        r = i(10247);
      const n = (e) => {
          if (e.reason === r.rS.NO_FREE_TRIALS_LEFT) {
            const t = "No email reviews left this month";
            let i;
            if (e.meta.quotaResetDate) {
              const t = Intl.DateTimeFormat([], {
                month: "short",
                day: "numeric",
              }).format(new Date(Date.parse(e.meta.quotaResetDate)));
              i = `You will get ${r.SR} free reviews again next month (${t}). You can also use paid expert writing help in Grammarly's web editor anytime.`;
            } else
              i = `You will get ${r.SR} free reviews again next month. You can also use paid expert writing help in Grammarly's web editor anytime.`;
            return { title: t, message: i };
          }
          return e.reason === r.rS.NOT_ENOUGH_WORDS
            ? {
                message: `Your email must be at least ${r.fy} words (currently ${e.meta.wordsCount}).`,
              }
            : e.reason === r.rS.TOO_MANY_WORDS
            ? {
                message: `Your email must be under ${r.Vw} words (currently ${e.meta.wordsCount}).`,
              }
            : ((e) => {
                switch (e) {
                  case r.rS.NOT_AVAILABLE:
                    return {
                      message:
                        "Our experts are currently working on other text. Please try again later.",
                    };
                  case r.rS.NOT_AVAILABLE_QUOTA_ERROR:
                    return {
                      title: "Something went wrong",
                      message:
                        "We couldn't determine how many requests you have left. Please try again later.",
                    };
                  case r.rS.CONFLICTING_REQUEST:
                    return {
                      title: "Separate request in progress",
                      message:
                        "You can submit this request once the experts are finished with the one you already submitted.",
                    };
                  case r.rS.CHECKING_INITIAL_AVAILABILITY:
                    return { message: "Checking for available experts..." };
                  case r.rS.UNSUPPORTED_LANGUAGE:
                    return {
                      message:
                        "Our writing experts can only help with emails written in English.",
                    };
                  default:
                    (0, s.vE)(e);
                }
              })(e.reason);
        },
        o = ({ info: e, includeTitle: t }) => {
          const i = n(e);
          return a.createElement(
            a.Fragment,
            null,
            t
              ? a.createElement(
                  a.Fragment,
                  null,
                  i.title
                    ? a.createElement("b", null, i.title)
                    : a.createElement("b", null, "Get expert writing help"),
                  a.createElement("br", null)
                )
              : null,
            i.message
          );
        };
      o.defaultProps = { includeTitle: false };
    },
    53844: (e, t, i) => {
      i.d(t, { q5: () => h, dK: () => m });
      var a = i(27378),
        s = i(12187),
        r = i(21420);
      const n = ({
        options: e,
        onChange: t = () => null,
        ariaLabel: i,
        className: n,
      }) => {
        const o = [],
          [l, c] = a.useState(null);
        a.useEffect(() => {
          var i;
          null !== l && (null === (i = o[l]) || void 0 === i || i.focus()),
            t(null !== l ? e[l].value : null);
        }, [l]);
        const d = null !== l ? e[l] : null;
        return a.createElement(
          "div",
          { "data-grammarly-part": "ui-kit-radio-group", className: n },
          a.createElement(
            "div",
            {
              className: r.radioGroup,
              role: "radiogroup",
              "aria-label": i,
              onKeyDown: (t) => {
                if (" " !== t.key || d) {
                  if ("ArrowRight" === t.key || "ArrowDown" === t.key) {
                    t.preventDefault(), t.stopPropagation();
                    c(((l || 0) + 1) % e.length);
                  } else if ("ArrowLeft" === t.key || "ArrowUp" === t.key) {
                    t.preventDefault(), t.stopPropagation();
                    const i = (l || 0) - 1;
                    c(i < 0 ? e.length - 1 : i);
                  }
                } else t.preventDefault(), t.stopPropagation(), c(0);
              },
            },
            e.map((e, t) => {
              const i = (null == d ? void 0 : d.value) === e.value,
                n = 0 === t;
              return a.createElement(
                "div",
                {
                  key: e.value,
                  ...(0, s.Sh)(
                    r.radioGroupOption,
                    i ? r.radioGroupOptionSelected : null
                  ),
                  role: "radio",
                  tabIndex: i || (n && !d) ? 0 : -1,
                  "aria-checked": i,
                  onClick: (e) => {
                    e.preventDefault(), e.stopPropagation(), c(t);
                  },
                  ref: (e) => o.push(e),
                },
                e.render()
              );
            })
          )
        );
      };
      var o,
        l = i(24606),
        c = i(47422),
        d = i(31944),
        u = i(51217),
        p = i(44544);
      !(function (e) {
        (e.bad = "bad"), (e.ok = "ok"), (e.good = "good");
      })(o || (o = {}));
      const h = ({
        hideLogo: e = false,
        align: t = "center",
        fixSubmitButtonOverflowBottomPadding: i = false,
        ...r
      }) => {
        var m;
        const h = [o.bad, o.ok, o.good],
          [g, v] = a.useState(null),
          [f, w] = a.useState(""),
          [b, S] = a.useState(false),
          [y, _] = a.useState(false);
        let k;
        return (
          (k =
            y && false !== r.showPostSubmitScreen
              ? a.createElement(
                  "div",
                  {
                    "data-grammarly-part": "surveys-feedback-form-thank-you",
                    ...(0, s.Sh)(
                      u.feedbackFormContainer,
                      u.feedbackFormContainerAlignCenter
                    ),
                  },
                  a.createElement(
                    "div",
                    { className: u.feedbackFormSuccessMessageTextContainer },
                    a.createElement("div", {
                      className: u.feedbackFormSuccessMessageIcon,
                    }),
                    a.createElement(
                      "div",
                      { className: u.feedbackFormSuccessMessageTitle },
                      "Thank you!"
                    ),
                    a.createElement(
                      "div",
                      { className: u.feedbackFormSuccessMessageSubtitle },
                      "Your feedback helps us improve."
                    )
                  ),
                  a.createElement(
                    l.z,
                    {
                      className: u.feedbackFormSubmitButton,
                      kind: "success",
                      type: "submit",
                      onClick: r.onClose,
                    },
                    "Done"
                  ),
                  i
                    ? a.createElement(
                        "div",
                        {
                          className:
                            u.feedbackFormSubmitButtonFixOverflowBottomPadding,
                        },
                        a.createElement("div", {
                          className:
                            u.feedbackFormSubmitButtonFixOverflowBottomPaddingChild,
                        })
                      )
                    : null
                )
              : a.createElement(
                  "div",
                  {
                    "data-grammarly-part": "surveys-feedback-form-fields",
                    ...(0, s.Sh)(
                      u.feedbackFormContainer,
                      "center" === t ? u.feedbackFormContainerAlignCenter : null
                    ),
                  },
                  a.createElement(
                    "div",
                    { className: u.feedbackFormFields },
                    e
                      ? null
                      : a.createElement("div", {
                          className: u.feedbackFormLogo,
                        }),
                    r.hideTitle
                      ? null
                      : a.createElement(
                          "div",
                          {
                            ...(0, s.Sh)(
                              u.feedbackFormTitle,
                              r.compactDisplay ? u.compact : null
                            ),
                          },
                          r.title ||
                            a.createElement(
                              "span",
                              null,
                              "How do you like ",
                              a.createElement("br", null),
                              " Grammarly?"
                            )
                        ),
                    r.withScore
                      ? a.createElement(
                          a.Fragment,
                          null,
                          a.createElement(n, {
                            ariaLabel: "Feedback Score",
                            options: h.map((e) => ({
                              value: e,
                              render() {
                                let t, i;
                                return (
                                  e === o.bad
                                    ? ((t =
                                        p.feedbackFormOptionIconDisheartening),
                                      (i = "I dislike it"))
                                    : e === o.ok
                                    ? ((t = p.feedbackFormOptionIconNeutral),
                                      (i = "It’s OK"))
                                    : ((t = t =
                                        p.feedbackFormOptionIconSmiling),
                                      (i = "I like it")),
                                  a.createElement(
                                    "div",
                                    { className: p.feedbackFormOption },
                                    a.createElement("div", {
                                      ...(0, s.Sh)(p.feedbackFormOptionIcon, t),
                                    }),
                                    a.createElement("div", null, i)
                                  )
                                );
                              },
                            })),
                            onChange: v,
                            ...(0, s.Sh)(
                              u.feedbackFormScore,
                              r.compactDisplay ? u.compact : null
                            ),
                          }),
                          r.hideTextBoxTitle
                            ? null
                            : a.createElement(
                                "div",
                                { className: u.feedbackFormTextBoxTitle },
                                "Anything we can improve?"
                              )
                        )
                      : null,
                    a.createElement(c.z, {
                      onChange: w,
                      placeholder: r.placeholderText || "Your thoughts here",
                      ariaLabel: "Feedback Text",
                      ...(0, s.Sh)(
                        u.feedbackFormTextBox,
                        r.compactDisplay ? u.compact : null
                      ),
                    }),
                    r.domain
                      ? a.createElement(
                          a.Fragment,
                          null,
                          r.hideDomainHelpText
                            ? null
                            : a.createElement(
                                "div",
                                { className: u.feedbackFormShareDomainTitle },
                                "Help improve Grammarly by sharing the domain you’re on:"
                              ),
                          a.createElement(
                            d.J,
                            {
                              labelId: "feedback-form-share-domain-checkbox",
                              onChange: S,
                              className: u.feedbackFormShareDomainCheckbox,
                            },
                            "Include the domain ",
                            a.createElement("b", null, r.domain),
                            " with my feedback"
                          )
                        )
                      : null
                  ),
                  a.createElement(
                    l.z,
                    {
                      className: u.feedbackFormSubmitButton,
                      kind:
                        null !== (m = r.submitButtonKind) && void 0 !== m
                          ? m
                          : "success",
                      type: "submit",
                      disabled: r.withScore ? !g : !f,
                      onClick: () => {
                        var e, t;
                        r.withScore && g
                          ? (null === (e = r.onSubmit) ||
                              void 0 === e ||
                              e.call(r, {
                                score: g,
                                text: f,
                                domain: b ? r.domain : void 0,
                              }),
                            _(true))
                          : !r.withScore &&
                            f &&
                            (null === (t = r.onSubmit) ||
                              void 0 === t ||
                              t.call(r, {
                                text: f,
                                domain: b ? r.domain : void 0,
                              }),
                            _(true));
                      },
                    },
                    "Submit"
                  ),
                  i
                    ? a.createElement(
                        "div",
                        {
                          className:
                            u.feedbackFormSubmitButtonFixOverflowBottomPadding,
                        },
                        a.createElement("div", {
                          className:
                            u.feedbackFormSubmitButtonFixOverflowBottomPaddingChild,
                        })
                      )
                    : null
                )),
          a.createElement(
            "div",
            { style: r.style, "data-grammarly-part": "surveys-feedback-form" },
            k
          )
        );
      };
    },
    24372: (e, t, i) => {
      i.d(t, { J: () => s });
      var a = i(64408);
      const s = new Proxy(
        {},
        {
          get:
            (e, t) =>
            (...e) =>
              a.emitBackground("gnar-track", { method: t, props: e }),
        }
      );
    },
    25682: (e, t, i) => {
      var a = i(93476)(function (e) {
        return e[1];
      });
      a.push([
        e.id,
        "._380Y1-textBox{font-family:grInter,sans-serif;font-style:normal;font-weight:normal;color:#0e101a;font-size:14px;line-height:21px;font-feature-settings:'ss03' on;background:#f9faff;border:1px solid #e7e9f5;box-sizing:border-box;border-radius:4px;padding:10px 8px;overflow-y:auto;cursor:text;width:100%;height:100%;}._380Y1-textBox:empty:before{font-feature-settings:'ss03' on;font-family:grInter,sans-serif;font-style:normal;font-weight:normal;color:#6d758d;font-size:14px;line-height:21px;content:attr(data-placeholder)}",
        "",
      ]),
        (a.locals = { textBox: "_380Y1-textBox" }),
        (e.exports = a);
    },
    58346: (e) => {
      e.exports = {
        singleCardAssistant: "_3vNtD",
        "purple-box-shadow-first-pulse": "_1cChL",
        "purple-box-shadow-pulse": "_19JUx",
        "purple-box-shadow-permanent": "_2H66A",
        singleCardAssistantSettingsDoneButton: "OMpnq",
      };
    },
    33751: (e) => {
      e.exports = {
        cardList: "_1Eape",
        cardListFooterDynamic: "Inkbe",
        cardListFooterStatic: "_7OpWh",
        cardListFooterAnimate: "_29PbU",
        upgradeHookWrapper: "_9GpAY",
        assistant: "AnaVG",
        dragging: "_1XWvb",
        mainView: "_38aRY",
      };
    },
    57556: (e) => {
      e.exports = {
        emogenieViewOverlayHeader: "_2Xrrv",
        emogenieViewOverlayHeaderBetaBadge: "qG0e8",
      };
    },
    90282: (e) => {
      e.exports = { footerButton: "_2rtYm", feedbackButton: "ywPnS" };
    },
    78846: (e) => {
      e.exports = {
        actions_hovered: "Xf2Pk",
        header: "_3p6xo",
        draggableWrapper: "_2_Oau",
        draggable: "_1m9e2",
        headerActions: "_2asjJ",
        headerActionBtnProofitIcon: "_1GEsJ",
        headerActionBtnGoalsIcon: "_1ZjAn",
        logoscore_fadein: "xzxut",
        fadein: "_30rWn",
        logoscore_fadeout: "_1DBSi",
        fadeout: "_24pVK",
        logo_score: "_6nCpo",
        spin: "_2gcAi",
      };
    },
    19217: (e) => {
      e.exports = {
        insight: "_3o8h_",
        insight__inline_icon: "svSbC",
        insight__inline_text: "_3Uft0",
      };
    },
    98029: (e) => {
      e.exports = {
        predictions: "_3feHG",
        predictions__header: "_35Gcg",
        predictions__card: "_2xc9F",
        counterContainer: "_2co0s",
        predictions__zero_text: "_25oPK",
        predictions__off_brand: "_1sCHK",
      };
    },
    40145: (e) => {
      e.exports = { relatedSuggestionsTitle: "_3lmjh" };
    },
    55364: (e) => {
      e.exports = {
        viewOverlay: "_3iGYO",
        content: "_2sw8A",
        footer: "_3kpn-",
        viewOverlayGoBack: "_2Z1Xu",
        defaultViewOverlayPanel: "jqEio",
        gradientViewOverlayPanel: "_3Qgxa",
        proofitViewOverlayPanel: "_9lDqb",
        defaultViewOverlayHeader: "_1GTGF",
        defaultViewOverlayContent: "nXzeg",
        gradientViewOverlayContent: "_2hao0",
        proofitViewOverlayContent: "_2XeMU",
        logo: "xQSpk",
        proofitViewOverlayHeader: "_3dGrl",
        proofitViewOverlayHeaderBetaBadge: "_2wTGA",
      };
    },
    44715: (e) => {
      e.exports = {
        viewOverlay: "_2Unkh",
        content: "_2jpRZ",
        footer: "_24flt",
        viewOverlayGoBack: "a19pK",
        defaultViewOverlayPanel: "KLJW2",
        gradientViewOverlayPanel: "_2_U8f",
        helpPanel: "_1PEah",
        defaultViewOverlayHeader: "_2_b0R",
        defaultViewOverlayContent: "_1PG6A",
        gradientViewOverlayContent: "_21gzK",
        logo: "_3JvmB",
        helpPanelContent: "_7zg7r",
        helpBanner: "_3zyoV",
        helpBannerImage: "_3bc5C",
        helpHeader: "_1vP1w",
        helpBannerMessage: "uCPe4",
        helpContent: "FQviE",
        heatmap: "BPLCG",
      };
    },
    82318: (e) => {
      e.exports = {
        viewOverlay: "_24v8y",
        content: "_1GUCQ",
        footer: "_VXnz",
        viewOverlayGoBack: "_2vYal",
        defaultViewOverlayPanel: "_181-n",
        gradientViewOverlayPanel: "_30LCU",
        defaultViewOverlayHeader: "_2YCIK",
        defaultViewOverlayContent: "_1T1GW",
        gradientViewOverlayContent: "_2hMw0",
        logo: "_1wpBP",
        cardList: "_2M4t-",
        headerGroup: "Qwt6V",
        questionMarkButton: "_2U3v1",
        questionMarkIcon: "_3hiB8",
        summaryWrapper: "_3f-rw",
        message: "_2UO09",
        relatedSuggestionsTitle: "_3oKNQ",
      };
    },
    91574: (e) => {
      e.exports = {
        viewOverlay: "_1xfDY",
        content: "BafXy",
        footer: "_3RySl",
        viewOverlayGoBack: "_1pPp-",
        defaultViewOverlayPanel: "_3M2J1",
        gradientViewOverlayPanel: "noaan",
        settingsViewOverlayPanel: "_3tn7z",
        defaultViewOverlayHeader: "_2Z-Ec",
        defaultViewOverlayContent: "_3lDk7",
        gradientViewOverlayContent: "_1ac5g",
        settingsViewOverlayContent: "_3krsk",
        logo: "_1VqGG",
        settingsViewDoneButton: "_2gIUv",
      };
    },
    35327: (e) => {
      e.exports = {
        summary_heading: "_28Zxw",
        summary_wrapper: "_3qF24",
        summary_fadein: "_1OTrB",
        fadein: "_1ETLE",
        summary_fadeout: "GJSzn",
        fadeout: "YHKQy",
      };
    },
    73008: (e) => {
      e.exports = {
        viewOverlay: "_8FYR8",
        content: "D8x8A",
        footer: "_1oEdF",
        viewOverlayGoBack: "_2IRn0",
        defaultViewOverlayPanel: "_3wpsL",
        gradientViewOverlayPanel: "_2zadI",
        defaultViewOverlayHeader: "_3Y5Ie",
        defaultViewOverlayContent: "_1FPwk",
        gradientViewOverlayContent: "_2WqSK",
        logo: "oiRsy",
      };
    },
    62513: (e) => {
      e.exports = {
        compactSuccessLens: "_1G56p",
        compactSuccessLensContainer: "_1cOu3",
      };
    },
    35630: (e) => {
      e.exports = {
        circleProgress: "_1npo5",
        circleText: "_3muDd",
        card: "AAT_T",
        header: "_3k6P5",
        compact: "_1Efs0",
        normal: "_2_T8O",
        progressIcon: "_3lupT",
        title: "_1U6tn",
        full: "_24i7N",
        progressContainer: "TH-Um",
        progressBar: "_1Tzvc",
        progressValue: "_1Ck8G",
        description: "_4m_YN",
      };
    },
    32585: (e) => {
      e.exports = {
        cardBody: "_1qMrW",
        description: "_3g_X-",
        actions: "G0xen",
        lessIcon: "_3HhMd",
        minimalDescription: "srN6O",
        actionsFooter: "_11uNl",
        feedbackFooter: "_2PAOt",
        viewMoreButton: "_1CGEL",
      };
    },
    11510: (e) => {
      e.exports = { miniCard: "_2FMyP" };
    },
    96807: (e) => {
      e.exports = { cardContainer: "_3o7T2", cardText: "_1phHb" };
    },
    47476: (e) => {
      e.exports = { headerOrFooterWrapper: "_1snlI" };
    },
    74880: (e) => {
      e.exports = { cardList: "_2bCPN" };
    },
    30509: (e) => {
      e.exports = { premiumLens: "_2XK23" };
    },
    879: (e) => {
      e.exports = { successLens: "_1mbLA" };
    },
    57731: (e) => {
      e.exports = {
        footer: "_3W9PJ",
        plagiarismButton: "_1nouH",
        counterWrapper: "GHbf1",
        counter: "_2h93m",
        counterCheckmarkIcon: "_2-1xd",
      };
    },
    21831: (e) => {
      e.exports = {
        defaultHeader: "ghh6_",
        priorityLensHeader: "_2xf6x",
        head: "_1uTIv",
        headerGroup: "_1oce-",
        logoIcon: "_3Ey-O",
        logoText: "_1hTkC",
        headerButton: "_2HD8-",
        setGoalsButton: "_1EomQ",
        divider: "_2ku5Y",
        lensNavigation: "_1d7rU",
        disabledLensNavigation: "NFW3f",
        prioritySwitchWrapper: "EIY83",
        prioritySwitchFlatWrapper: "_3ujn6",
      };
    },
    44617: (e) => {
      e.exports = {
        header: "_2Yfwp",
        headerGroup: "_3Sxnx",
        logoIcon: "_3ijAI",
        closeButton: "LbVuE",
      };
    },
    79850: (e) => {
      e.exports = { wrapper: "_2PLre" };
    },
    75259: (e) => {
      e.exports = {
        container: "_2D4XC",
        baseGrid: "_2pCwn",
        bottomLeft: "_3_LGs",
        bottomRight: "_2tHhO",
        top: "_2Qg0A",
        notificationWrapper: "_3waR1",
      };
    },
    67129: (e) => {
      e.exports = { sidebarContainer: "_1_f6i", sidebarContent: "_3QlJG" };
    },
    7538: (e) => {
      e.exports = {
        learnMore: "_20Tq4",
        learnMoreExample: "_1k4BW",
        learnMoreExampleIconAndTitle: "_3wg3T",
        learnMoreExampleIcon: "_1DRAV",
        learnMoreExampleCorrectIcon: "_3LNkD",
        learnMoreExampleIncorrectIcon: "_1A-P-",
        learnMoreExampleTitle: "_2vWyx",
        learnMoreExampleTextItalic: "_2Apwj",
        learnMoreExampleTextMarginLeft: "_30FxK",
        spin: "_2QPBm",
      };
    },
    12267: (e) => {
      e.exports = {
        singleCardAssistant: "_29x5a",
        singleCardAssistantHeader: "eFwvd",
        singleCardAssistantHeaderDraggable: "_3wYqZ",
        singleCardAssistantContent: "_1r3xI",
        singleCardAssistantContentWithPadding: "Jgq6x",
        singleCardAssistantFooter: "_23i2M",
        singleCardAssistantFooterText: "mTIL9",
        singleCardAssistantFooterButtonIcon: "FJI7I",
        spin: "_2z-hC",
      };
    },
    17208: (e) => {
      e.exports = {
        successReport: "_2zWCa",
        successReportIcon: "_3aU35",
        successReportTitle: "_2C75-",
        successReportSubtitle: "_6-_6x",
        spin: "_3dWuJ",
      };
    },
    12266: (e) => {
      e.exports = {
        emogenieReport: "SoJtK",
        emogenieReportHeader: "wVkE-",
        emogenieReportHeaderTitle: "_1ARH3",
        emogenieReportHeaderSubTitle: "_3Jo1r",
        emogenieReportHeaderBrandOffSubTitle: "_1FbkK",
        emogenieReportItems: "_18u69",
        emogenieReportCheckbox: "_1mxcw",
        emogenieReportToneSuggestionInfo: "_3uoiv",
        emogenieReportToneSuggestionInfoEmojiAndTitle: "_1lwtc",
        emogenieReportToneSuggestionInfoEmoji: "_1aDI9",
        emogenieReportToneSuggestionInfoButton: "_7IMZu",
      };
    },
    8471: (e) => {
      e.exports = {
        emogenieReportItem: "_2VgP1",
        emogenieReportItemBrandTone: "os2BZ",
        emogenieReportItemFeedback: "_3Po2q",
        emogenieReportItemFeedbackIcon: "_3jxVn",
        emogenieReportItemFeedbackText: "_3sBTt",
        emogenieReportItemEmotion: "_2pWWy",
        emogenieReportItemEmotionEmojiAndName: "_3Z3wv",
        emogenieReportItemEmotionEmoji: "_2cinA",
        emogenieReportItemEmotionName: "GSyum",
        emogenieReportItemEmotionIntensity: "_3oWFN",
        emogenieReportItemEmotionIntensityDot: "_2wQcZ",
        emogenieReportItemEmotionIntensityDotActive: "_9zOn8",
        emogenieReportItemEmotionVoteNoIncorrect: "_2LXXo",
        emogenieReportItemEmotionVoteNoOffensive: "jEzKP",
        emogenieReportItemDescription: "_1A3aU",
        spin: "_1g4LL",
      };
    },
    75100: (e) => {
      e.exports = {
        settingsButtonMediumIcon: "_1PPTj",
        settingsButtonSmallIcon: "_20Pta",
        spin: "_2dlxE",
      };
    },
    22536: (e) => {
      e.exports = {
        checkboxContainer: "_3bj_g",
        checkbox: "xrB8R",
        checkboxChecked: "Uhddy",
        checkboxCheckmark: "_1qI2g",
        spin: "_3S_a3",
      };
    },
    21420: (e) => {
      e.exports = {
        radioGroup: "_3jZFB",
        radioGroupOption: "_1Boe7",
        radioGroupOptionSelected: "_37tnK",
      };
    },
    24468: (e) => {
      e.exports = {
        voteContainer: "Ir02q",
        voteYes: "_3NPbN",
        voteYesIcon: "MA3k0",
        voteYesSelected: "_1BGaq",
        voteNo: "_21H7_",
        voteNoIcon: "IdM9o",
        voteNoSelected: "_1ydaU",
        spin: "BNG8O",
      };
    },
    59e3: (e) => {
      e.exports = {
        proofitRequestFormBtnLoadingSpinner: "_1dhPr",
        spin: "_34iE-",
      };
    },
    41063: (e) => {
      e.exports = {
        proofitHowItWorksSteps: "_29Vif",
        proofitHowItWorksStep: "M3Zas",
        proofitHowItWorksStepNumberContainer: "oAgaO",
        proofitHowItWorksStepNumber: "_1ZCJT",
        proofitHowItWorksStepOne: "_1jzAP",
        proofitHowItWorksStepOneNumberContainer: "_3zIlJ",
        proofitHowItWorksStepTwo: "TNSEJ",
        proofitHowItWorksStepTwoNumberContainer: "_2B7-Z",
        proofitHowItWorksStepThree: "_3G_IW",
        proofitHowItWorksStepThreeNumberContainer: "_1xWbH",
      };
    },
    17487: (e) => {
      e.exports = {
        proofitRequestForm: "_16jRB",
        proofitRequestFormImg: "L3ge0",
        proofitRequestFormTitle: "_2AohE",
        proofitRequestFormDescription: "_1-l2N",
        proofitRequestFormCostAndTime: "_1fthW",
        proofitRequestFormTime: "XwGo8",
        proofitRequestFormCostAndTimeTitle: "kTnKg",
        proofitRequestFormCostAndTimeSubtitle: "_12FlO",
        proofitRequestFormRequestBtn: "_3Iaok",
        proofitRequestFormUnavailableMsg: "_1hKiE",
        proofitRequestFormFootnote: "_3_jiZ",
        proofitRequestFormFootnoteFreeTrial: "IrTLS",
        proofitRequestFormFootnoteHowItWorksDontShowAgainCheckbox: "canRi",
        proofitRequestFormPrivacyInfoTitle: "_2YkLm",
        proofitRequestFormPrivacyInfoDescription: "_23aSV",
        proofitRequestFormPrivacyInfoDescriptionItem: "_31giz",
        proofitRequestFormPrivacyInfoDescriptionItemBulletPoint: "_3vURB",
      };
    },
    8400: (e) => {
      e.exports = {
        proofitReviewForm: "_1_T1p",
        proofitReviewFormTitle: "_1VtIM",
        proofitReviewFormDescription: "gQQZe",
        proofitFeedbackForm: "_tV9e",
        proofitDoneButton: "W2xwF",
      };
    },
    57398: (e) => {
      e.exports = {
        scoreRing: "_1V95O",
        loading: "_3_fuY",
        rotation: "_3cevg",
        scoreText: "_3MN4B",
      };
    },
    51217: (e) => {
      e.exports = {
        feedbackFormContainer: "_1M-GI",
        feedbackFormContainerAlignCenter: "_3QNrK",
        feedbackFormFields: "Jg_OY",
        feedbackFormTitle: "nPjzw",
        feedbackFormTextBoxTitle: "_2yUbL",
        feedbackFormLogo: "_2C-d7",
        compact: "_1wDKK",
        feedbackFormScore: "_3AmBq",
        feedbackFormTextBox: "FO2oU",
        feedbackFormShareDomainTitle: "_2UXTO",
        feedbackFormShareDomainCheckbox: "_3mSXM",
        feedbackFormSubmitButton: "_32xYR",
        feedbackFormSubmitButtonFixOverflowBottomPadding: "IJDSA",
        feedbackFormSubmitButtonFixOverflowBottomPaddingChild: "_3d5Tf",
        feedbackFormSuccessMessageTextContainer: "_2JO6Z",
        feedbackFormSuccessMessageIcon: "oVxds",
        feedbackFormSuccessMessageTitle: "_1MdvM",
        feedbackFormSuccessMessageSubtitle: "_1EKkw",
        spin: "_2ycFE",
      };
    },
    44544: (e) => {
      e.exports = {
        feedbackFormOption: "_9K_Q8",
        feedbackFormOptionIcon: "_259oL",
        feedbackFormOptionIconDisheartening: "_3NJTM",
        feedbackFormOptionIconNeutral: "i-5N8",
        feedbackFormOptionIconSmiling: "_1Dxi9",
        spin: "_2elyX",
      };
    },
    71527: (e) => {
      e.exports = { selected: "_3Ibej", label: "EKNV1", option: "ygVjN" };
    },
    66402: (e) => {
      e.exports = {
        american: "pyFmV",
        australian: "_2WGo3",
        british: "_1nkJZ",
        canadian: "_35Lt7",
      };
    },
    68089: (e) => {
      e.exports = { hover_blocker: "_1b9OS" };
    },
    56542: (e) => {
      e.exports = {
        settingsContent: "_2LPPC",
        fullWidth: "_1c69A",
        heading: "uyO-m",
        allSettings: "_3yj-F",
        separator: "_2LaDH",
        settingsLink: "_1DiWR",
      };
    },
    1005: (e) => {
      e.exports = { heading: "LLSOT" };
    },
    26485: (e) => {
      e.exports = {
        select_checkbox: "_3jXk9",
        centered: "_2GfZn",
        select_children: "nYWGL",
        beta: "_2D7H7",
        new: "_3Lqg-",
        alpha: "_3GrtL",
        checkbox: "_2nj-e",
        checkbox_check: "_28S0f",
        on: "UigB5",
        off: "_30ryz",
        checkbox_check_round: "_1PwEM",
        checkbox_control_wrapper: "_1KIp6",
        grayOut: "ZleQc",
        on_off: "_3mcZ6",
        disabled: "_1Sp_7",
        setting_item: "_3JLH2",
      };
    },
    6304: (e) => {
      e.exports = {
        line: "_2vgUt",
        disabled: "_3kA-F",
        dialectPicker: "_2v6OJ",
      };
    },
    47740: (e) => {
      e.exports = {
        container: "_1eoMt",
        containerWithBackground: "_12wVe",
        content: "Z9SrV",
        title: "_3hI6a",
        button: "_1LGnG",
      };
    },
    17324: (e) => {
      e.exports = {
        windows: "_2wKpF",
        setting_item: "_6eFop",
        fixing: "_3sQF9",
        thin_text: "_2m369",
        footer: "AIrzw",
        gr_popup_settings: "_18flg",
        iOS: "_2Y-35",
        footer_btn: "_16bxQ",
        short_border: "FqAkb",
        top: "_2N9kH",
        upgraded: "_1D3x1",
        content: "_36NTm",
        since: "dfV8r",
        business: "Nb2Rp",
        edu: "_3Q9EY",
        my_grammarly: "_1NXBN",
        new_document: "bpEGW",
        unsupported_site: "iBAYN",
        unsupported_item: "_13zLn",
        unsupported_title: "_3rfYX",
        domain: "_1tlAE",
        domain_in_details: "_2z4_y",
        unsupported_temporary: "Xw4Jp",
        unsupported_permanently: "_27hK2",
        unsupported_grammarly: "_2xTYa",
        diamond: "p3X6p",
        userPanel: "_3cZ8t",
        email: "bBX3_",
        link: "_3ko8g",
        blue: "b4yKe",
        edc_stripe: "_1wkrp",
        line: "_2_8JS",
        not_supported: "kU9B_",
        site_switcher: "_2KZQq",
        upgrade: "_1zI1G",
        def_switcher: "_29_cp",
        on: "_2JO5i",
        off: "_3f4Zs",
        favicon: "sjSDn",
        centered: "taU_8",
        summary: "_1cNov",
        upgrade_title: "_3aOe6",
        settingsContent: "_2BkNA",
        withBackground: "pNvqp",
        llamaTitle: "h5j0H",
        llamaDescription: "mHaqr",
      };
    },
    23345: (e) => {
      e.exports = { line: "NMkwQ", content: "lWYTI", upgrade: "_2GRJe" };
    },
  },
]);
