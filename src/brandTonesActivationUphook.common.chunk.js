(self.webpackChunk = self.webpackChunk || []).push([
  [2826],
  {
    73684: (e, t, n) => {
      n.r(t), n.d(t, { BrandTonesActivationUphookView: () => o });
      var a = n(27378),
        c = n(92783),
        s = n(64757),
        i = n(61922),
        r = n(74734);
      const o = ({ trackShow: e, onActivateClick: t, onDismissClick: n }) => (
        (0, a.useEffect)(() => {
          e();
        }, []),
        a.createElement(
          "section",
          { className: r.container },
          a.createElement("div", { className: r.sectionTitle }, "Related"),
          a.createElement(
            "section",
            { className: r.banner },
            a.createElement("div", { className: r.icon }),
            a.createElement(
              "div",
              { className: r.content },
              a.createElement("div", { className: r.title }, "Brand Tones"),
              a.createElement(
                "div",
                { className: r.text },
                "You can help your team write",
                a.createElement("br", null),
                "consistently on-brand."
              ),
              a.createElement(
                s.zx.Group,
                null,
                a.createElement(
                  s.zx.Primary,
                  {
                    href: `${
                      (0, c.Um)().brandTones
                    }?utm_medium=internal&utm_source=acHook&utm_campaign=chromeExtEmogenieReport`,
                    target: "_blank",
                    name: "activate-brand-tones",
                    onClick: t,
                  },
                  a.createElement(i.JO.Gear, { width: 14, height: 14 }),
                  "Set Brand Tones"
                ),
                a.createElement(
                  s.zx.Flat,
                  { name: "dismiss-brand-tones-hook", onClick: n },
                  "Dismiss"
                )
              )
            )
          )
        )
      );
    },
    74734: (e) => {
      e.exports = {
        container: "FYqne",
        sectionTitle: "_2yxiI",
        banner: "_2sHUr",
        icon: "_3WPoM",
        title: "_1p4qd",
        text: "_2mDNo",
        showWrapper: "KEABi",
      };
    },
  },
]);
