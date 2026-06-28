"""
AURIENT — Frame Setup
=====================
Run once after cloning. Converts your source PNG frames to web-optimised JPEGs.

Usage:
  python3 setup_frames.py <path-to-frames.zip>

Example:
  python3 setup_frames.py ~/Downloads/video_frames_24fps_high_quality.zip

Requires: pip install Pillow
"""
import sys, os, zipfile, time
from pathlib import Path
from io import BytesIO

try:
    from PIL import Image
except ImportError:
    os.system("pip install Pillow"); from PIL import Image

def main():
    zip_path = Path(sys.argv[1]) if len(sys.argv) > 1 else next(
        (p for p in [Path.home()/"Downloads"/"video_frames_24fps_high_quality.zip",
                     Path("video_frames_24fps_high_quality.zip")] if p.exists()), None)
    if not zip_path or not zip_path.exists():
        print(__doc__); sys.exit(1)

    out = Path(__file__).parent / "backend" / "public" / "frames"
    out.mkdir(parents=True, exist_ok=True)
    print(f"\n🎬  AURIENT Frame Setup\n    Source : {zip_path}\n    Output : {out}\n")

    with zipfile.ZipFile(zip_path) as zf:
        pngs = sorted(n for n in zf.namelist() if n.lower().endswith('.png') and '/' not in n.lstrip('/'))

    total = len(pngs); start = time.time()
    print(f"    Found {total} frames — converting to progressive JPEG (quality 65)…\n")

    with zipfile.ZipFile(zip_path) as zf:
        for i, name in enumerate(pngs):
            Image.open(BytesIO(zf.read(name))).convert("RGB").save(
                out / f"frame_{i:05d}.jpg", "JPEG", quality=65, optimize=True, progressive=True)
            if (i+1) % 40 == 0 or i == total-1:
                pct = round((i+1)/total*100)
                bar = "█"*(pct//5) + "░"*(20-pct//5)
                rem = (time.time()-start)/(i+1)*(total-i-1)
                print(f"    [{bar}] {pct:3d}%  {i+1}/{total}  ~{rem:.0f}s left")

    mb = sum(f.stat().st_size for f in out.glob("*.jpg"))/1024/1024
    print(f"\n✅  Done! {total} frames → {mb:.1f} MB\n")
    print("    Next:  npm install && npm run dev\n")

if __name__ == "__main__": main()
