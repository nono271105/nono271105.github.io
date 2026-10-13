/* Affichage des projets (depuis projects.js), agrandissement et menu mobile. */
(function () {
  "use strict";

  var lang = document.documentElement.lang === "fr" ? "fr" : "en";
  var L = lang === "fr"
    ? { alt: "Capture d'écran de ", enlarge: "Agrandir", close: "Fermer", prev: "Image précédente", next: "Image suivante" }
    : { alt: "Screenshot of ", enlarge: "Enlarge", close: "Close", prev: "Previous image", next: "Next image" };

  /* ---------- Menu mobile ---------- */
  var mobileBtn = document.getElementById("mobile-toggle");
  var navMenu = document.getElementById("nav-menu");
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      mobileBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        mobileBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Projets ---------- */
  var grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  var root = grid.getAttribute("data-root") || "";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function imageUrl(project, file) {
    return root + "assets/projects/" + project.id + "/" + file;
  }

  function buildTags(project) {
    var tags = el("div", "tags-row");
    project.tags.forEach(function (tag) { tags.appendChild(el("span", "tag-chip", tag)); });
    return tags;
  }

  function buildLinks(project) {
    var actions = el("div", "project-actions");
    project.links.forEach(function (link) {
      var a = el("a", "project-link", link.label[lang]);
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      actions.appendChild(a);
    });
    return actions;
  }

  /* ---------- Fenêtre d'agrandissement ---------- */
  var dlg = null, dlgState = { project: null, files: [], index: 0 };
  var dlgImg, dlgCount, dlgThumbs, dlgInfo, dlgPrev, dlgNext;

  function buildDialog() {
    dlg = el("dialog", "project-dialog");
    dlg.setAttribute("aria-label", "Project");

    var close = el("button", "dialog-close", L.close);
    close.type = "button";
    close.addEventListener("click", function () { dlg.close(); });

    var stage = el("div", "dialog-stage");
    dlgPrev = el("button", "dialog-nav dialog-prev", "\u2039");
    dlgPrev.type = "button";
    dlgPrev.setAttribute("aria-label", L.prev);
    dlgNext = el("button", "dialog-nav dialog-next", "\u203A");
    dlgNext.type = "button";
    dlgNext.setAttribute("aria-label", L.next);
    dlgImg = el("img", "dialog-img");
    stage.appendChild(dlgPrev);
    stage.appendChild(dlgImg);
    stage.appendChild(dlgNext);

    dlgCount = el("div", "dialog-count");
    dlgThumbs = el("div", "project-thumbs");
    dlgInfo = el("div", "dialog-info");

    dlg.appendChild(close);
    dlg.appendChild(stage);
    dlg.appendChild(dlgCount);
    dlg.appendChild(dlgThumbs);
    dlg.appendChild(dlgInfo);
    document.body.appendChild(dlg);

    dlgPrev.addEventListener("click", function () { go(-1); });
    dlgNext.addEventListener("click", function () { go(1); });

    /* Clic en dehors du contenu : fermeture */
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { document.documentElement.classList.remove("dialog-open"); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });
  }

  function go(step) {
    var n = dlgState.files.length;
    showInDialog((dlgState.index + step + n) % n);
  }

  function showInDialog(i) {
    dlgState.index = i;
    var p = dlgState.project;
    dlgImg.src = imageUrl(p, dlgState.files[i]);
    dlgImg.alt = L.alt + p.title;
    var many = dlgState.files.length > 1;
    dlgCount.textContent = many ? (i + 1) + " / " + dlgState.files.length : "";
    dlgPrev.hidden = dlgNext.hidden = !many;
    dlgThumbs.querySelectorAll("button").forEach(function (b, k) {
      b.setAttribute("aria-current", k === i ? "true" : "false");
    });
  }

  function openDialog(project, files, index) {
    if (!dlg) buildDialog();
    dlgState = { project: project, files: files, index: index };

    dlgThumbs.textContent = "";
    if (files.length > 1) {
      files.forEach(function (file, k) {
        var btn = el("button", "project-thumb");
        btn.type = "button";
        btn.setAttribute("aria-label", L.alt + project.title + " " + (k + 1));
        var img = el("img");
        img.src = imageUrl(project, file);
        img.alt = "";
        btn.appendChild(img);
        btn.addEventListener("click", function () { showInDialog(k); });
        dlgThumbs.appendChild(btn);
      });
    }

    dlgInfo.textContent = "";
    dlgInfo.appendChild(el("span", "project-type", project.type[lang]));
    dlgInfo.appendChild(el("h3", "project-title", project.title));
    dlgInfo.appendChild(el("p", "project-text", project.text[lang]));
    dlgInfo.appendChild(buildTags(project));
    dlgInfo.appendChild(buildLinks(project));
    dlg.setAttribute("aria-label", project.title);

    showInDialog(index);
    document.documentElement.classList.add("dialog-open");
    dlg.showModal();
  }

  /* ---------- Image de couverture et miniatures de la carte ---------- */
  function buildMedia(project, card, actions) {
    var files = project.images || [];
    if (!files.length) return null;

    var media = el("div", "project-media");
    var frame = el("button", "project-frame");
    frame.type = "button";
    frame.setAttribute("aria-label", L.enlarge + " : " + project.title);
    var main = el("img", "project-img");
    main.alt = L.alt + project.title;
    main.loading = "lazy";
    frame.appendChild(main);
    media.appendChild(frame);

    var thumbs = el("div", "project-thumbs");
    var valid = [], current = 0;

    function show(index) {
      current = index;
      main.src = imageUrl(project, valid[index]);
      thumbs.querySelectorAll("button").forEach(function (b, i) {
        b.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function build() {
      if (!valid.length) { media.remove(); return; }
      card.classList.add("has-media");
      if (valid.length > 1) {
        valid.forEach(function (file, i) {
          var btn = el("button", "project-thumb");
          btn.type = "button";
          btn.setAttribute("aria-label", L.alt + project.title + " " + (i + 1));
          var img = el("img");
          img.src = imageUrl(project, file);
          img.alt = "";
          img.loading = "lazy";
          btn.appendChild(img);
          btn.addEventListener("click", function () { show(i); });
          thumbs.appendChild(btn);
        });
        media.appendChild(thumbs);
      }
      show(0);

      var open = function () { openDialog(project, valid.slice(), current); };
      frame.addEventListener("click", open);
      var enlarge = el("button", "project-link project-enlarge", L.enlarge);
      enlarge.type = "button";
      enlarge.addEventListener("click", open);
      actions.insertBefore(enlarge, actions.firstChild);
    }

    /* Ignore les fichiers introuvables avant d'afficher quoi que ce soit. */
    var pending = files.length;
    files.forEach(function (file) {
      var probe = new Image();
      probe.onload = function () { valid.push(file); done(); };
      probe.onerror = function () { done(); };
      probe.src = imageUrl(project, file);
    });
    function done() {
      pending -= 1;
      if (pending === 0) {
        valid.sort(function (a, b) { return files.indexOf(a) - files.indexOf(b); });
        build();
      }
    }
    return media;
  }

  function buildCard(project) {
    var card = el("article", "project-card" + (project.featured ? " project-featured" : ""));
    var body = el("div", "project-body");
    var actions = buildLinks(project);

    var media = buildMedia(project, card, actions);
    if (media) card.appendChild(media);

    body.appendChild(el("span", "project-type", project.type[lang]));
    body.appendChild(el("h3", "project-title", project.title));
    body.appendChild(el("p", "project-text", project.text[lang]));
    body.appendChild(buildTags(project));
    body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  PROJECTS.filter(function (p) { return !p.hidden; }).forEach(function (project) {
    grid.appendChild(buildCard(project));
  });
})();