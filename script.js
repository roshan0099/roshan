/**
 * Roshan - Production Engineer / SRE / DevOps Portfolio
 * Terminal interactions, command line parser, and utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-input');
  const cliLog = document.getElementById('cli-log');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');
  const toast = document.getElementById('toast');
  const shortcutPills = document.querySelectorAll('.shortcut-pill');

  const EMAIL = 'roshan09ka@gmail.com';

  // Toast Helper
  let toastTimer = null;
  function showToast(message, duration = 2800) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // Copy Email to Clipboard
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        showToast(`[SUCCESS] Copied: ${EMAIL}`);
        if (copyEmailText) {
          const original = copyEmailText.textContent;
          copyEmailText.textContent = 'Copied!';
          setTimeout(() => {
            copyEmailText.textContent = original;
          }, 2000);
        }
      } catch (err) {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = EMAIL;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`[SUCCESS] Copied: ${EMAIL}`);
      }
    });
  }

  // Highlight Section Animation
  function highlightSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const card = section.querySelector('.terminal-card');
    if (card) {
      card.style.transition = 'all 0.3s ease';
      card.style.borderColor = '#22c55e';
      card.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.3)';
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }, 1500);
    }
  }

  // Available Terminal Commands
  const commands = {
    'help': () => {
      return `Available terminal commands:
  • cat about.txt       - View background and philosophy
  • cat experience.txt  - View production engineering history
  • ls skills/          - List cloud & DevOps technical stack
  • find projects       - View featured infrastructure projects
  • ls blogs/           - Read technical write-ups & articles
  • cat contact.txt     - Get contact details & social channels
  • whoami              - View production engineer profile
  • uptime              - Check portfolio reliability SLA
  • clear               - Clear output console`;
    },
    'whoami': () => {
      return `Roshan
Role: Production Engineer • SRE • DevOps
Focus: Cloud, Linux, Docker Automation, Exploring Kubernetes
Base: Bangalore, India`;
    },
    'uptime': () => {
      return `System Uptime: 99.999% SLA
Active nodes: 12 (Production Ready)
Status: Healthy & Online`;
    },
    'sudo': () => {
      return `User roshan is already root. Permission granted with unlimited coffee.`;
    }
  };

  // Execute Command Line Input
  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Handle scroll targets
    if (cmd === 'cat about.txt' || cmd === 'about') {
      highlightSection('about');
      return;
    }
    if (cmd === 'cat experience.txt' || cmd === 'experience' || cmd === 'exp') {
      highlightSection('experience');
      return;
    }
    if (cmd === 'ls skills/' || cmd === 'ls skills' || cmd === 'skills') {
      highlightSection('skills');
      return;
    }
    if (cmd.includes('projects') || cmd === 'find projects') {
      highlightSection('projects');
      return;
    }
    if (cmd === 'ls blogs/' || cmd === 'ls blogs' || cmd === 'blogs') {
      highlightSection('blogs');
      return;
    }
    if (cmd === 'cat contact.txt' || cmd === 'contact' || cmd === 'email') {
      highlightSection('contact');
      return;
    }
    if (cmd === 'clear') {
      if (cliLog) {
        cliLog.innerHTML = '';
        cliLog.style.display = 'none';
      }
      return;
    }

    // Terminal command evaluations
    if (cliLog) {
      cliLog.style.display = 'block';
      let outputText = '';

      if (commands[cmd]) {
        outputText = commands[cmd]();
      } else {
        outputText = `zsh: command not found: ${rawCmd}. Type 'help' for available commands.`;
      }

      cliLog.innerHTML = `<span style="color: #22c55e;">&gt; roshan@portfolio:~$</span> ${escapeHtml(rawCmd)}\n${escapeHtml(outputText)}`;
      cliLog.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }

  // Terminal Input Event
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        executeCommand(val);
        terminalInput.value = '';
      }
    });
  }

  // Quick Shortcut Pills
  shortcutPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (terminalInput) {
        terminalInput.value = cmd;
      }
      executeCommand(cmd);
      if (cmd !== 'help' && cmd !== 'clear') {
        if (terminalInput) terminalInput.value = '';
      }
    });
  });

  // Window Controls Easter Eggs
  const closeBtn = document.querySelector('.control-dot.close');
  const minBtn = document.querySelector('.control-dot.minimize');
  const expBtn = document.querySelector('.control-dot.expand');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      showToast("Cannot close terminal: production session is active!");
    });
  }
  if (minBtn) {
    minBtn.addEventListener('click', () => {
      showToast("Terminal minimized to background daemon.");
    });
  }
  if (expBtn) {
    expBtn.addEventListener('click', () => {
      showToast("Full terminal view enabled.");
    });
  }
});
