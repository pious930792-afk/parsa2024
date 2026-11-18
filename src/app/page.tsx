"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CodeStudio from "@/components/CodeStudio";
import AIBotTab from "@/components/AIBotTab";
import PublicGamesGallery from "@/components/PublicGamesGallery";
import FriendsTab from "@/components/FriendsTab";
import BugReportTab from "@/components/BugReportTab";
import AuthModal from "@/components/AuthModal";
import CreatorsModal from "@/components/CreatorsModal";
import FullscreenGameModal from "@/components/FullscreenGameModal";
import ShareGameModal from "@/components/ShareGameModal";
import { Sparkles, Terminal, Gamepad2, Heart, Award, ArrowLeft } from "lucide-react";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("studio");

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [isCreatorsOpen, setIsCreatorsOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Active game data for fullscreen & share
  const [activeGame, setActiveGame] = useState<{
    title: string;
    code: string;
    language: string;
    authorName?: string;
  }>({
    title: "مار نئونی افسانه‌ای",
    code: "",
    language: "html",
    authorName: "پارسا خیری",
  });

  // Friend requests count
  const [friendRequestsCount, setFriendRequestsCount] = useState(0);

  // Check current logged-in user on mount
  const checkCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Check friend requests
  const checkFriendRequests = async () => {
    try {
      const res = await fetch("/api/friends");
      if (res.ok) {
        const data = await res.json();
        setFriendRequestsCount(data.incoming?.length || 0);
      }
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      checkFriendRequests();
    }
  }, [currentUser]);

  // Handle URL params for shared games (e.g., ?gameId=2)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("gameId");
    if (gameId) {
      fetch(`/api/games/${gameId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.game) {
            setActiveGame({
              title: data.game.title,
              code: data.game.code,
              language: data.game.language,
              authorName: data.game.author_name,
            });
            setActiveTab("studio");
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleOpenAuth = (mode: "login" | "register" = "register") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/me", { method: "POST" });
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenFullscreenFromStudio = (title: string, code: string, language: string) => {
    setActiveGame({
      title,
      code,
      language,
      authorName: currentUser?.username || "پارسا خیری",
    });
    setIsFullscreenOpen(true);
  };

  const handleOpenShareFromStudio = (title: string, code: string, language: string) => {
    setActiveGame({
      title,
      code,
      language,
      authorName: currentUser?.username || "پارسا خیری",
    });
    setIsShareOpen(true);
  };

  const handlePlayFromGallery = (game: any) => {
    setActiveGame({
      title: game.title,
      code: game.code,
      language: game.language,
      authorName: game.author_name,
    });
    setActiveTab("studio");
  };

  const handleFullscreenFromGallery = (game: any) => {
    setActiveGame({
      title: game.title,
      code: game.code,
      language: game.language,
      authorName: game.author_name,
    });
    setIsFullscreenOpen(true);
  };

  const handleShareFromGallery = (game: any) => {
    setActiveGame({
      title: game.title,
      code: game.code,
      language: game.language,
      authorName: game.author_name,
    });
    setIsShareOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenCreators={() => setIsCreatorsOpen(true)}
        onLogout={handleLogout}
        friendRequestsCount={friendRequestsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Dynamic Header Hero Notification */}
        <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/25 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-cyan-500/20">
              🚀
            </div>
            <div>
              <div className="text-sm sm:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300">
                پلتفرم هوشمند کدنویسی و بازی‌سازی پارسا خیری
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                طراحی شده با کمک جمینای • کدنویسی زنده، اجرای بازی، سیستم دوستان و گزارش باگ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreatorsOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/80 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-950/40"
            >
              <span>👑 صفحه سازندگان: پارسا خیری با کمک جمینای</span>
            </button>
          </div>
        </section>

        {/* Tab 1: Studio */}
        {activeTab === "studio" && (
          <CodeStudio
            initialTitle={activeGame.title}
            initialCode={activeGame.code || undefined}
            initialLanguage={activeGame.language}
            onOpenFullscreen={handleOpenFullscreenFromStudio}
            onOpenShareModal={handleOpenShareFromStudio}
          />
        )}

        {/* Tab 2: AI Bot */}
        {activeTab === "bot" && <AIBotTab />}

        {/* Tab 3: Public Community Games Gallery */}
        {activeTab === "gallery" && (
          <PublicGamesGallery
            onPlayGameInStudio={handlePlayFromGallery}
            onOpenFullscreen={handleFullscreenFromGallery}
            onOpenShareModal={handleShareFromGallery}
          />
        )}

        {/* Tab 4: Friends System */}
        {activeTab === "friends" && (
          <FriendsTab
            currentUser={currentUser}
            onOpenAuth={() => handleOpenAuth("register")}
            onSelectGameByAuthor={(author) => {
              setActiveTab("gallery");
            }}
          />
        )}

        {/* Tab 5: Bug Report */}
        {activeTab === "bugs" && (
          <BugReportTab
            currentUser={currentUser}
            onOpenAuth={() => handleOpenAuth("register")}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-6 text-center text-xs text-slate-400" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>© ۲۰۲۵ آکادمی کدنویسی و بازی‌سازی</span>
            <span>•</span>
            <button
              onClick={() => setIsCreatorsOpen(true)}
              className="text-cyan-400 font-bold hover:underline"
            >
              پارسا خیری با کمک جمینای
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <button onClick={() => setActiveTab("studio")} className="hover:text-cyan-300">
              کدنویسی
            </button>
            <button onClick={() => setActiveTab("bot")} className="hover:text-purple-300">
              بات هوشمند
            </button>
            <button onClick={() => setActiveTab("gallery")} className="hover:text-cyan-300">
              گالری بازی‌ها
            </button>
            <button onClick={() => setActiveTab("friends")} className="hover:text-cyan-300">
              دوستان
            </button>
            <button onClick={() => setActiveTab("bugs")} className="hover:text-rose-300">
              گزارش باگ
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      <CreatorsModal
        isOpen={isCreatorsOpen}
        onClose={() => setIsCreatorsOpen(false)}
      />

      <FullscreenGameModal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        gameTitle={activeGame.title}
        gameCode={activeGame.code}
        language={activeGame.language}
        authorName={activeGame.authorName}
        onShare={() => setIsShareOpen(true)}
      />

      <ShareGameModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        gameCode={activeGame.code}
        language={activeGame.language}
        defaultTitle={activeGame.title}
        onPublished={(newGame) => {
          setActiveTab("gallery");
        }}
      />
    </div>
  );
}
